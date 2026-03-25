"use client";

import { Counter } from "../../Counter";
import styles from "./styles.module.scss";

type TProps = {
  className?: string;
  name: string;
  text: string;
};

const ResultCard = ({ name, text, className }: TProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.card__inner}>
        <h3 className={styles.card__name}>{name}</h3>
        <Counter
          className={styles.card__text}
          from={0}
          to={text}
          durationSpeed={3}
        />
      </div>
    </div>
  );
};

export default ResultCard;
