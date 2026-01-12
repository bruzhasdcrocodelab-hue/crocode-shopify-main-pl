import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-08-01',
  useCdn: false,
});

export async function fetchGROQ<T = any>(
  query: string,
  params?: Record<string, any>,
): Promise<{ data: T; error: any }> {
  try {
    const data = params
      ? await sanityClient.fetch<T>(query, params)
      : await sanityClient.fetch<T>(query);
    return { data, error: null };
  } catch (error: any) {
    console.error('GROQ fetch error:', error);
    return { data: null as T, error: error.message };
  }
}
