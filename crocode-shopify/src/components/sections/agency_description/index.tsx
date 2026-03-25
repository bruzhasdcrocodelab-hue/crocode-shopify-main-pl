import styles from "./styles.module.scss";

import { Section, Text, Background } from "@/components/ui";
import { Fade } from "@/components/ui/Fade";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { useTranslations } from "next-intl";

const AgencyDescription = () => {
  const t = useTranslations("WhyCrocodePage.AgencyDescription");

  return (
    <Section type="rounded" className={styles.section}>
      <Background
        desktop="/images/background/bg-dark.webp"
        alt="background image"
      />
      <div className={styles.section__inner}>
        <WordsPullUp text={t("title")} className={styles.section__title} />
        <div className={styles.section__content}>
          <Fade direction="down">
            <p className={styles.section__text}>{t("text1")}</p>
          </Fade>
          <Fade direction="down">
            <p className={styles.section__text}>{t("text2")}</p>
          </Fade>
        </div>
      </div>
    </Section>
  );
};

export default AgencyDescription;
