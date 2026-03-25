import styles from "./styles.module.scss";

import { Button, Section, Text } from "@/components/ui";
import { useTranslations } from "next-intl";
import { splitTextIntoParagraphs } from "@/utils/parseTextContent";
import { Fade } from "@/components/ui/Fade";
import { BlurIn } from "@/components/ui/BlurIn";

const Experts = () => {
  const t = useTranslations("HomePage.experts");
  const textParagraphs = splitTextIntoParagraphs(t("text"));

  return (
    <Section className={styles.experts}>
      <div className={styles.experts__inner}>
        <Fade direction="up">
          <Text
            className={styles.experts__title}
            tag="h2"
            text={t("title")}
            style="small"
          ></Text>
        </Fade>

        <Fade direction="up">
          <Text
            className={styles.experts__subtitle}
            tag="p"
            text={t("subtitle")}
            style="big"
          />
        </Fade>

        <BlurIn>
          <div className={styles.experts__texts}>
            {textParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.experts__message}>
                {paragraph}
              </p>
            ))}
          </div>
        </BlurIn>
        <Fade direction="down">
          <Button as="link" href="/contact" text={t("button.text")} />
        </Fade>
      </div>
    </Section>
  );
};

export default Experts;
