"use client";

import { Fade } from "@/components/ui/Fade";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui";
import { TServiceCard } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BlurIn } from "@/components/ui/BlurIn";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

type TProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  services: TServiceCard[];
  buttonText: string;
  buttonHref: string;
  id: string;
};

const ServiceBlock = ({
  title,
  description,
  imageUrl,
  imageAlt,
  services,
  buttonText,
  buttonHref,
  id,
}: TProps) => {
  const paragraphs = description.split("\n\n").filter((p) => p.trim());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className={styles.serviceBlock} id={id}>
      <div className={styles.serviceBlock__inner}>
        <Fade direction="up">
          <h2 className={styles.serviceBlock__title}>{title}</h2>
        </Fade>
        <div className={styles.serviceBlock__tags} ref={ref}>
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, delay: i * 0.4 }}
              className={styles.serviceBlock__tag}
            >
              <Link href={`/services/${service.slug.current}`}>
                {service.title}
              </Link>
            </motion.div>
          ))}
        </div>
        <BlurIn>
          <div
            className={styles.serviceBlock__video}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt || title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </div>

          <div className={styles.serviceBlock__content}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.serviceBlock__description}>
                {paragraph}
              </p>
            ))}
          </div>
        </BlurIn>
        <Fade direction="down">
          <div className={styles.serviceBlock__buttonBlock}>
            <Button
              as="link"
              href={buttonHref}
              text={buttonText}
              styleType="primary"
              className={styles.serviceBlock__button}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ServiceBlock;
