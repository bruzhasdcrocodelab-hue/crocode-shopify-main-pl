"use client";

import styles from "./styles.module.scss";

import Link from "next/link";
import {
  Button,
  Background,
  ClutchWidget,
  TextType,
  PartnerWidget,
} from "@/components/ui";
import { useBackgroundImageForHeader } from "@/hooks/useHeaderTheme";
import { memo } from "react";
import { BlurIn } from "@/components/ui/BlurIn";
import ThreeTrail from "../three_trail";

type TProps = {
  bg?: {
    desktop: string;
    mobile?: string;
    alt: string;
  };
  isShowNetwork?: boolean;
  button?: {
    text: string;
  };
  title: string;
  subtitle?: string;
  shift?: boolean;
  animatedBg?: boolean;
};

const Hero = ({
  bg,
  title,
  subtitle,
  isShowNetwork = false,
  button,
  shift = false,
  animatedBg = false,
}: TProps) => {
  if (bg) {
    useBackgroundImageForHeader();
  }

  return (
    <section className={`${styles.hero} ${shift ? styles["hero--shift"] : ""}`}>
      {bg && (
        <Background
          desktop={bg.desktop}
          mobile={bg?.mobile || bg.desktop}
          alt={bg.alt}
          priority
          loading="eager"
        />
      )}
      {animatedBg && <ThreeTrail opacityValue={1} />}
      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>
          <BlurIn>
            <TextType
              text={title}
              textAs={"h1"}
              className={styles.hero__title}
            />
          </BlurIn>

          {subtitle && (
            <BlurIn>
              <TextType
                text={subtitle}
                typingSpeed={10}
                textAs={"p"}
                className={styles.hero__description}
              />
            </BlurIn>
          )}
        </div>
        <HeroBottom button={button} isShowNetwork={isShowNetwork} />
      </div>
    </section>
  );
};

export default Hero;

const HeroBottom = memo(
  ({
    button,
    isShowNetwork,
  }: {
    button?: {
      text: string;
    };
    isShowNetwork: boolean;
  }) => {
    return (
      <div className={styles.hero__bottom}>
        {button && (
          <Button
            as="link"
            href="/contact"
            styleType="secondary"
            className={styles.hero__button}
            text={button.text}
          />
        )}

        {isShowNetwork && (
          <BlurIn>
            <div className={styles.hero__bottom_right}>
              <div className={styles.hero__widgets}>
                <Link
                  href="https://clutch.co/profile/crocode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hero__widget_link}
                >
                  <ClutchWidget />
                </Link>
                <Link
                  href={
                    "https://www.shopify.com/partners/directory/partner/krokod-sp-z-o-o"
                  }
                  target="_blank"
                  className={styles.hero__widget_link}
                >
                  <PartnerWidget />
                </Link>
              </div>

              <div className={styles.hero__networks}>
                <Link
                  className={styles.hero__network_link}
                  href={"www.youtube.com/@crocodelab"}
                >
                  youtube
                </Link>
                <Link
                  className={styles.hero__network_link}
                  href={"https://www.tiktok.com/@crocodelab"}
                >
                  tictok
                </Link>
                <Link
                  className={styles.hero__network_link}
                  href={"https://www.linkedin.com/company/crocodelab/"}
                >
                  LINKEDIN
                </Link>
              </div>
            </div>
          </BlurIn>
        )}
      </div>
    );
  },
);
