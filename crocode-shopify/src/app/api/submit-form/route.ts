import { NextRequest, NextResponse } from "next/server";

async function getZohoAccessToken(): Promise<string | null> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL } =
    process.env;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    return null;
  }

  const accountsUrl = ZOHO_ACCOUNTS_URL || "https://accounts.zoho.eu";

  const res = await fetch(
    `${accountsUrl}/oauth/v2/token?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
    { method: "POST" }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[Zoho] Token refresh failed:", res.status, text);
    return null;
  }

  const data = await res.json();
  if (!data.access_token) {
    console.error("[Zoho] No access_token in response:", data);
    return null;
  }

  return data.access_token;
}

async function findLeadByEmail(accessToken: string, email: string): Promise<string | null> {
  const apiUrl = process.env.ZOHO_API_URL || "https://www.zohoapis.eu/crm/v2";

  try {
    const res = await fetch(
      `${apiUrl}/Leads/search?criteria=(Email:equals:${encodeURIComponent(email)})`,
      { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } }
    );

    if (res.status === 204) return null;

    if (!res.ok) {
      console.error("[Zoho] Lead search failed:", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].id as string;
    }
    return null;
  } catch (err) {
    console.error("[Zoho] Lead search error:", err);
    return null;
  }
}

async function createLead(
  accessToken: string,
  formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
  }
): Promise<string | null> {
  const apiUrl = process.env.ZOHO_API_URL || "https://www.zohoapis.eu/crm/v2";

  const res = await fetch(`${apiUrl}/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          First_Name: formData.firstName,
          Last_Name: formData.lastName || formData.firstName,
          Company: formData.companyName,
          Email: formData.email,
          Phone: formData.phone,
          Lead_Source: "Website",
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[Zoho] Lead creation failed:", res.status, text);
    throw new Error(`Zoho lead creation failed: ${res.status}`);
  }

  const data = await res.json();
  return data.data?.[0]?.details?.id ?? null;
}

async function addNoteToLead(
  accessToken: string,
  leadId: string,
  budget: string,
  project: string
): Promise<void> {
  const apiUrl = process.env.ZOHO_API_URL || "https://www.zohoapis.eu/crm/v2";

  const noteContent = [
    budget ? `Budget: ${budget}` : "",
    project ? `Project details:\n${project}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const res = await fetch(`${apiUrl}/Notes`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          Note_Title: "Website Inquiry",
          Note_Content: noteContent,
          Parent_Id: leadId,
          $se_module: "Leads",
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[Zoho] Note creation failed:", res.status, text);
  }
}

async function processZohoLead(
  accessToken: string,
  formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
    budget: string;
    project: string;
  }
): Promise<void> {
  let leadId = await findLeadByEmail(accessToken, formData.email);

  if (!leadId) {
    leadId = await createLead(accessToken, formData);
  }

  if (leadId) {
    await addNoteToLead(accessToken, leadId, formData.budget, formData.project);
  }
}

async function addMailerLiteSubscriber(
  email: string,
  firstName: string,
  lastName: string
): Promise<void> {
  const { MAILERLITE_API_KEY, MAILERLITE_GROUP_ID } = process.env;

  if (!MAILERLITE_API_KEY) return;

  const body: Record<string, unknown> = {
    email,
    fields: { name: firstName, last_name: lastName },
    status: "active",
  };

  if (MAILERLITE_GROUP_ID) {
    body.groups = [MAILERLITE_GROUP_ID];
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[MailerLite] Subscriber creation failed:", res.status, text);
    throw new Error(`MailerLite failed: ${res.status}`);
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const { firstName, lastName, companyName, email, phone, budget, project, newsletter } =
    formData;

  const errors: string[] = [];

  if (newsletter) {
    try {
      await addMailerLiteSubscriber(email, firstName, lastName);
    } catch {
      errors.push("newsletter");
    }
  }

  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      await processZohoLead(accessToken, {
        firstName,
        lastName,
        companyName,
        email,
        phone,
        budget,
        project,
      });
    } else {
      console.warn("[Zoho] Skipping — no access token");
      errors.push("crm_token");
    }
  } catch {
    errors.push("crm");
  }

  return NextResponse.json({ success: true, errors });
}
