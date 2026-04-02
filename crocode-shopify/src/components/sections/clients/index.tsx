"use client";

import { WordsPullUp } from "@/components/ui/WordsPullUp";
import styles from "./styles.module.scss";

import { Section, Background } from "@/components/ui";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import ThreeTrail from "../three_trail";
import { BlurIn } from "@/components/ui/BlurIn";

const clients_image = [
  {
    image: "/images/clients/arcus.svg",
    alt: "arcus client",
  },
  {
    image: "/images/clients/hvisk.svg",
    alt: "hvisk client",
  },
  {
    image: "/images/clients/lost-boys.svg",
    alt: "lost-boys client",
  },
  {
    image: "/images/clients/ttswtrs.svg",
    alt: "ttswtrs client",
  },
  {
    image: "/images/clients/remaer.svg",
    alt: "remaer client",
  },
  {
    image: "/images/clients/s.svg",
    alt: "s client",
  },
  {
    image: "/images/clients/coffeeface.svg",
    alt: "coffeeface client",
  },
  {
    image: "/images/clients/rociosegura.svg",
    alt: "rociosegura client",
  },
  {
    image: "/images/clients/geeiq.svg",
    alt: "geeiq client",
  },
  {
    image: "/images/clients/atomic.svg",
    alt: "atomic client",
  },
  {
    image: "/images/clients/hooked.svg",
    alt: "hooked client",
  },
  {
    image: "/images/clients/valse.svg",
    alt: "valse client",
  },
  {
    image: "/images/clients/tmrw.svg",
    alt: "tmrw client",
  },
  {
    image: "/images/clients/mitre10.svg",
    alt: "mitre10 client",
  },
  {
    image: "/images/clients/ubaa-haus.svg",
    alt: "ubaa-haus client",
  },
  {
    image: "/images/clients/kleanse.svg",
    alt: "kleamse client",
  },
  {
    image: "/images/clients/inwohn.svg",
    alt: "inwohn client",
  },
  {
    image: "/images/clients/sho.svg",
    alt: "sho client",
  },
];

const Clients = () => {
  const t = useTranslations("HomePage.clients");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Section className={styles.clients} type="rounded" shift>
      <Background
        desktop="/images/background/bg-black-ball.webp"
        alt="background image"
      />
      <ThreeTrail />
      <div className={styles.clients__inner} ref={ref}>
        <h2 className={styles.clients__title}>
          {t("title")
            ?.split("")
            .map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
        </h2>
        <div className={styles.clients__list}>
          {clients_image.map((item, i) => (
            <motion.div
              key={i}
              className={styles.clients__item}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, delay: i * 0.4 }}
            >
              <Image src={item.image} width={180} height={100} alt={item.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Clients;
