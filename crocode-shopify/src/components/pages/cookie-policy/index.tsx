"use client";

import styles from "./styles.module.scss";
import { Section, Background } from "@/components/ui";
import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme";
import { useTranslations } from "next-intl";

const CookiePolicyPage = () => {
  useDarkThemeForHeader();
  const t = useTranslations("CookiePolicyPage");

  return (
    <Section className={styles.page} isBlack>
      <Background
        desktop="/images/background/bg-black-ball-toll.webp"
        alt="background"
      />
      <div className={styles.page__hero}>
        <h1 className={styles.page__title}>{t("title")}</h1>
        <p className={styles.page__meta}>{t("effectiveDate")}</p>
        <p className={styles.page__meta}>{t("applies")}</p>
      </div>
      <div className={styles.page__inner}>
        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section1.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section1.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section2.title")}</h2>
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionA.title")}
            </p>
            <p
              className={styles.section__text}
              dangerouslySetInnerHTML={{ __html: t.raw("section2.subsectionA.text") as string }}
            />
          </div>
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionB.title")}
            </p>
            <p
              className={styles.section__text}
              dangerouslySetInnerHTML={{ __html: t.raw("section2.subsectionB.text") as string }}
            />
          </div>
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionC.title")}
            </p>
            <p
              className={styles.section__text}
              dangerouslySetInnerHTML={{ __html: t.raw("section2.subsectionC.text") as string }}
            />
          </div>
          <div className={styles.section__subsection}>
            <p className={styles.section__subsection_title}>
              {t("section2.subsectionD.title")}
            </p>
            <p
              className={styles.section__text}
              dangerouslySetInnerHTML={{ __html: t.raw("section2.subsectionD.text") as string }}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section3.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section3.text") as string }}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.section__title}>{t("section4.title")}</h2>
          <p
            className={styles.section__text}
            dangerouslySetInnerHTML={{ __html: t.raw("section4.text") as string }}
          />
        </div>
      </div>
    </Section>
  );
};

export default CookiePolicyPage;
