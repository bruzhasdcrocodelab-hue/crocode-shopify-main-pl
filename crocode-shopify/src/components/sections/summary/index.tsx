"use client";

import { Fade } from "@/components/ui/Fade";
import styles from "./styles.module.scss";

import { Text } from "@/components/ui";
import { TBrief } from "@/types/templates/project";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { BlurIn } from "@/components/ui/BlurIn";
import { useRef } from "react";

type TProps = {
  title: string;
  brief: TBrief;
};

const Summary = ({ title, brief }: TProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const details = [
    {
      title: "Industry",
      answer: brief?.industry,
    },
    {
      title: "Project",
      answer: title,
    },
    {
      title: "Technology",
      answer: brief?.technologies,
    },
    {
      title: "Website",
      answer: brief?.website,
    },
  ];

  interface DetailItemProps {
    title: string;
    value: string | string[];
    type?: "text" | "list" | "link";
    linkUrl?: string;
    linkText?: string;
    isInView?: boolean;
  }

  const DetailItem = ({
    title,
    value,
    type = "text",
    linkUrl,
    linkText,
    isInView,
  }: DetailItemProps) => {
    const renderContent = () => {
      switch (type) {
        case "list":
          return (
            <ul className={styles.summary__list}>
              {(value as string[]).map((item, index) => (
                <motion.li
                  initial={{ x: "100%", opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  key={index}
                  className={styles.summary__listItem}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          );
        case "link":
          return (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
            >
              <Link href={linkUrl || (value as string)}>
                {linkText || (value as string)}
              </Link>
            </motion.div>
          );
        default:
          return (
            <motion.span
              initial={{ x: "100%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
            >
              {value as string}
            </motion.span>
          );
      }
    };

    return (
      <div className={styles.summary__detail_item}>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className={styles.summary__detail_title}
        >
          {title}
        </motion.h3>
        <div className={styles.summary__detail_answer}>{renderContent()}</div>
      </div>
    );
  };

  return (
    <section className={styles.summary}>
      <div className={styles.summary__inner}>
        <div className={styles.summary__description}>
          <Fade direction="down">
            <Text
              className={styles.summary__title}
              tag="h2"
              text="The Brief"
              style="big"
            />

            <p className={styles.summary__message}>{brief?.description}</p>
          </Fade>
        </div>
        <div className={styles.summary__detail} ref={ref}>
          <DetailItem
            title="Industry"
            value={brief?.industry}
            isInView={isInView}
          />
          <DetailItem title="Project" value={title} isInView={isInView} />
          <DetailItem
            title="Technology"
            value={brief?.technologies}
            type="list"
            isInView={isInView}
          />
          <DetailItem
            title="Website"
            value={brief?.website.url}
            type="link"
            linkText={brief?.website.text}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
};

export default Summary;
