import { BlurIn } from "@/components/ui/BlurIn";
import styles from "./styles.module.scss";
import {
  Section,
  Background,
  Text,
  CardIndustry,
  TextType,
} from "@/components/ui";
import { Fade } from "@/components/ui/Fade";
import { useTranslations } from "next-intl";

const Industries = () => {
  const t = useTranslations("HomePage.industries");

  const cardsKey = ["card1", "card2", "card3"];
  const cards = cardsKey.map((key, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: t(`cards.${key}.title`),
    description: t(`cards.${key}.text`),
  }));

  return (
    <Section className={styles.industries} type="rounded" shift>
      <Background
        desktop={"/images/background/bg_hero.webp"}
        mobile="/images/background/bg_hero.webp"
        alt="background"
      />

      <div className={styles.industries__inner}>
        <BlurIn>
          <TextType
            className={styles.industries__title}
            text={t("title")}
            textAs={"h2"}
          />
        </BlurIn>

        <Fade direction="up">
          <Text className={styles.industries__subtitle} text={t("text")} />
        </Fade>
        <Fade className={styles.industries__content} direction="up">
          {cards.map((item, i) => (
            <CardIndustry
              className={styles.industries__card}
              {...item}
              key={i}
            />
          ))}
        </Fade>
      </div>
    </Section>
  );
};

export default Industries;
