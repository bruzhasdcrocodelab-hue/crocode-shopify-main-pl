"use client";

import { BlurIn } from "@/components/ui/BlurIn";
import styles from "./styles.module.scss";

import { Section } from "@/components/ui";
import useScreenSize from "@/hooks/useScreenSize";
import { TImagesBigAndSmall } from "@/types/templates/image";
import Image from "next/image";

type TProps = {
  image: TImagesBigAndSmall;
};

const Gallery = ({ image }: TProps) => {
  const images = {
    desktop:
      image?.imageDesktop?.asset?.url || "/images/background/bg_hero.webp",
    mobile:
      image?.imageMobile?.asset?.url ||
      "/images/background/bg_hero_mobile.webp",
    alt: image?.altText || "Project gallery",
  };
  const { isSmallMobile } = useScreenSize();
  return (
    <Section className={styles.gallery}>
      <BlurIn>
        <Image
          className={styles.gallery__image}
          src={isSmallMobile ? images.mobile : images.desktop}
          width={1980}
          height={1300}
          alt={images.alt}
        />
      </BlurIn>
    </Section>
  );
};

export default Gallery;
