"use client";

import StaggeredFade from "@/components/ui/StaggeredFade";
import styles from "./styles.module.scss";

import { Section, Accordion } from "@/components/ui";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Fade } from "@/components/ui/Fade";

const Faqs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [accordionIdIsOpen, setAccordionIdIsOpen] = useState<number | null>(
    null,
  );

  const handlerToggle = (id: number) => {
    setAccordionIdIsOpen(accordionIdIsOpen == id ? null : id);
  };

  return (
    <Section className={styles.section}>
      <div className={styles.section__inner} ref={ref}>
        <WordsPullUp text="Najczęściej zadawane pytania | Crocode" className={styles.section__title} />
        <p className={styles.section__subtitle}>
          <StaggeredFade
            isInView={isInView}
            text="Znajdź odpowiedzi na często zadawane pytania dotyczące naszej agencji rozwoju platformy Crocode Shopify i naszych usług."
          />
        </p>
        <div className={styles.section__list}>
          {Array.from({ length: 7 }).map((el, i) => (
            <Fade direction="down" key={i}>
              <Accordion
                isOpen={i == accordionIdIsOpen}
                handlerToggle={() => handlerToggle(i)}
              />
            </Fade>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Faqs;
