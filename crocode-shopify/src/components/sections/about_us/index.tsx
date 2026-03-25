import styles from "./styles.module.scss";

import { Text } from "@/components/ui";
import { useTranslations } from "next-intl";
import RichText from "@/utils/rich-text";
import { splitTextIntoParagraphs } from "@/utils/parseTextContent";
import { Fade } from "@/components/ui/Fade";

const HomeAboutUs = () => {
  const t = useTranslations("HomePage.why-shopify");
  const t2 = useTranslations("HomePage.about-us");

  const whyShopifyParagraphs = splitTextIntoParagraphs(t("text"));
  const aboutUsParagraphs = splitTextIntoParagraphs(t2("text"));

  return (
    <section className={styles.aboutUs}>
      <Fade direction="up">
        <div className={styles.aboutUs__inner}>
          <Text
            className={styles.aboutUs__title}
            tag="h2"
            text={t("title")}
            style="small"
          />
          <div className={styles.aboutUs__content}>
            <RichText
              className={styles.aboutUs__message}
              translationKey={"HomePage.why-shopify.message"}
            />
            <div className={styles.aboutUs__texts}>
              {whyShopifyParagraphs.map((paragraph, index) => (
                <p key={index} className={styles.aboutUs__text}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Fade>

      <Fade direction="up">
        <div className={styles.aboutUs__inner}>
          <Text
            className={styles.aboutUs__title}
            tag="h2"
            text={t2("title")}
            style="small"
          />
          <div className={styles.aboutUs__content}>
            <RichText
              className={styles.aboutUs__message}
              translationKey={"HomePage.about-us.message"}
            />
            <div className={styles.aboutUs__texts}>
              {aboutUsParagraphs.map((paragraph, index) => (
                <p key={index} className={styles.aboutUs__text}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default HomeAboutUs;
