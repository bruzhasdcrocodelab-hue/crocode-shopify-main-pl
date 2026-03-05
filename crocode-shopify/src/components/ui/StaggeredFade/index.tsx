"use client";

import { motion } from "motion/react";

type StaggeredFadeTypes = {
  text: string;
  isInView: boolean;
};

const StaggeredFade = ({ text, isInView }: StaggeredFadeTypes) => {
  return (
    <>
      {text?.split("").map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: idx * 0.01 }}
        >
          {letter}
        </motion.span>
      ))}
    </>
  );
};

export default StaggeredFade;
