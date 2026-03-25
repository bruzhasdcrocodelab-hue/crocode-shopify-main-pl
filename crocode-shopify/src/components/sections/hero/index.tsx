"use client";

import styles from "./styles.module.scss";

import Link from "next/link";
import { Button, Background, ClutchWidget } from "@/components/ui";
import { useBackgroundImageForHeader } from "@/hooks/useHeaderTheme";
import { useInView } from "motion/react";
import { useRef } from "react";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import StaggeredFade from "@/components/ui/StaggeredFade";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
        <div className={styles.hero__content} ref={ref}>
          <WordsPullUp text={title} className={styles.hero__title} />
          <p className={styles.hero__description}>
            <StaggeredFade text={subtitle || ""} isInView={isInView} />
          </p>
        </div>
        {(button || isShowNetwork) && (
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
                  <a
                    href="https://clutch.co/profile/crocode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.hero__clutch}
                  >
                    <ClutchWidget />
                  </a>
                  <div className={styles.hero__networks}>
                    <Link className={styles.hero__network_link} href={"/"}>
                      TWITTER
                    </Link>
                    <Link className={styles.hero__network_link} href={"/"}>
                      FACEBOOK
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
        )}
      </div>
    </section>
  );
};

export default Hero;
