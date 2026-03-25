"use client";

import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import * as React from "react";

type AnimatedCounterProps = {
  from: number;
  to: number | string;
  durationSpeed?: number;
  className?: string;
};

const parseInput = (
  value: number | string,
): { num: number; suffix: string } => {
  if (typeof value === "number") {
    return { num: value, suffix: "" };
  }
  // Ищем число в начале строки (включая возможный знак минуса)
  const match = value.match(/^(-?\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  // Если числа нет — считаем число = 0, а вся строка становится суффиксом
  return { num: 0, suffix: value };
};

export const Counter = ({
  from = 0,
  to,
  className = "text-xl font-extrabold sm:text-2xl md:text-3xl",
  durationSpeed = 10,
}: AnimatedCounterProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  const parsedFrom = React.useMemo(() => parseInput(from), [from]);
  const parsedTo = React.useMemo(() => parseInput(to), [to]);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;

    // Начальное отображение: число from + суффикс to
    element.textContent = `${parsedFrom.num}${parsedTo.suffix}`;

    // Если пользователь предпочитает уменьшенное движение — сразу ставим финальное значение
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = `${parsedTo.num}${parsedTo.suffix}`;
      return;
    }

    // Запускаем анимацию числа
    const controls = animate(parsedFrom.num, parsedTo.num, {
      duration: durationSpeed,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = `${Math.round(value)}${parsedTo.suffix}`;
      },
    });

    return () => controls.stop();
  }, [ref, inView, parsedFrom, parsedTo, durationSpeed]);

  return <span ref={ref} className={className} />;
};
