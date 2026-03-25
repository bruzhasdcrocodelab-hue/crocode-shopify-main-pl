import styles from "./styles.module.scss";

import { Section, Text, ResultCard, Background } from "@/components/ui";
import { Fade } from "@/components/ui/Fade";
import { useTranslations } from "next-intl";
import ThreeTrail from "../three_trail";

const CARDS = [
  {
    name: "Team members",
    text: "20",
  },
  {
    name: "Happy clients",
    text: "100+",
  },
  {
    name: "Happy clients",
    text: "18",
  },
  {
    name: "Happy clients",
    text: "9х",
  },
];

const OurResult = () => {
  const t = useTranslations("AboutUsPage.results");
  return (
    <Section type="rounded" className={styles.result} shift>
      <Background
        desktop="/images/background/bg-black-ball.webp"
        alt="background black"
      />
      <ThreeTrail />
      <div className={styles.result__inner}>
        <Fade direction="down">
          <Text
            className={styles.result__title}
            tag="h2"
            text={t("title")}
            style="big"
          />
        </Fade>

        <Fade direction="down">
          <div className={styles.result__content}>
            {CARDS.map((card, i) => (
              <ResultCard {...card} key={i} />
            ))}
          </div>
        </Fade>
      </div>
    </Section>
  );
};

export default OurResult;
