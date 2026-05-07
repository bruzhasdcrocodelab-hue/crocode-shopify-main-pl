"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export const BlurIn = ({
  children,
  duration = 1,
}: {
  children: React.ReactNode;
  duration?: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: duration }}
    >
      {isInView ? children : null}
    </motion.div>
  );
};
