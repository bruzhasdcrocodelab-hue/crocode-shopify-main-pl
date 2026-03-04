"use client";

import styles from "./styles.module.scss";
import { Section, Background } from "@/components/ui";
import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme";
import { useTranslations } from "next-intl";

const PrivacyPolicyPage = () => {
  useDarkThemeForHeader();
  const t = useTranslations("PrivacyPolicyPage");

  return (
    <Section className={styles.page} isBlack>
      <Background
        desktop="/images/background/bg-black-ball-toll.webp"
        alt="background"
      />
      <div className={styles.page__inner}>
        <div className={styles.page__header}>
          <h1 className={styles.page__title}>{t("title")}</h1>
          <p className={styles.page__meta}>{t("effectiveDate")}</p>
          <p className={styles.page__meta}>{t("applies")}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section1.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section1.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section2.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section2.intro") as string }}
          />
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionA.title")}
            </p>
            <ul className={styles.section__list}>
              {(t.raw("section2.subsectionA.items") as string[]).map((item, i) => (
                <li
                  key={i}
                  className={styles.section__list_item}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionB.title")}
            </p>
            <ul className={styles.section__list}>
              {(t.raw("section2.subsectionB.items") as string[]).map((item, i) => (
                <li
                  key={i}
                  className={styles.section__list_item}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section3.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section3.intro") as string }}
          />
          <ul className={styles.section__list}>
            {(t.raw("section3.items") as string[]).map((item, i) => (
              <li
                key={i}
                className={styles.section__list_item}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section4.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section4.intro") as string }}
          />
          <ul className={styles.section__list}>
            {(t.raw("section4.items") as string[]).map((item, i) => (
              <li
                key={i}
                className={styles.section__list_item}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section5.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section5.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section6.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section6.intro") as string }}
          />
          <ul className={styles.section__list}>
            {(t.raw("section6.items") as string[]).map((item, i) => (
              <li
                key={i}
                className={styles.section__list_item}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section6.outro") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section7.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section7.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section8.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section8.intro") as string }}
          />
          <ul className={styles.section__list}>
            {(t.raw("section8.items") as string[]).map((item, i) => (
              <li
                key={i}
                className={styles.section__list_item}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section9.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section9.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section10.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section10.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section11.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section11.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section12.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section12.text") as string }}
          />
        </div>
      </div>
    </Section>
  );
};

export default PrivacyPolicyPage;
