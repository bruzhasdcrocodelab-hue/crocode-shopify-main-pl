"use client";

import styles from "./styles.module.scss";

import { Section, Background, TextType } from "@/components/ui";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo, useRef } from "react";
import ThreeTrail from "../three_trail";
import { BlurIn } from "@/components/ui/BlurIn";
import { clients_image, type ClientImage } from "./data";

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
        {isInView && (
          <>
            <BlurIn>
              <TextType
                text={t("title")}
                textAs={"h2"}
                typingSpeed={30}
                className={styles.clients__title}
              />
            </BlurIn>

            <ClientList clients_image={clients_image} />
          </>
        )}
      </div>
    </Section>
  );
};

export default Clients;

const ClientList = memo(
  ({ clients_image }: { clients_image: ClientImage[] }) => {
    return (
      <div className={styles.clients__list}>
        {clients_image.map((item, i) => (
          <motion.div
            key={i}
            className={styles.clients__item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.4 }}
          >
            <Image src={item.image} width={180} height={100} alt={item.alt} />
          </motion.div>
        ))}
      </div>
    );
  },
);
