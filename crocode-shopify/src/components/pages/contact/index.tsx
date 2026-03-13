"use client";

import styles from "./styles.module.scss";

import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme";
import { Form, MapSection } from "@/components/sections";
import { Background, Section, Text } from "@/components/ui";
import { useTranslations } from "next-intl";
import { Fade } from "@/components/ui/Fade";
import StaggeredFade from "@/components/ui/StaggeredFade";
import { useRef } from "react";
import { useInView } from "motion/react";
import { BlurIn } from "@/components/ui/BlurIn";

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useDarkThemeForHeader();
  const t = useTranslations("ContactPage");
  return (
    <>
      <Section className={styles.contact} isBlack>
        <Background
          desktop="/images/background/bg-black-ball-toll.webp"
          alt="background black with balls"
        />
        <div className={styles.contact__hero} ref={ref}>
          <Fade direction="down">
            <Text
              className={styles.contact__title}
              tag="h1"
              text={t("title")}
              style="small"
            />
          </Fade>
          {/* <p className={styles.contact__subtitle}>
            <StaggeredFade
              text={t("subtitle")}
              isInView={isInView}
            ></StaggeredFade>
          </p> */}
        </div>
        <div className={styles.contact__content}>
          <Form />
          <BlurIn>
            <MapSection />
          </BlurIn>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
