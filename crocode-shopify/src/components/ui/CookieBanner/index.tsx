"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";

const COOKIE_CONSENT_KEY = "cookie_consent";

const CookieBanner = () => {
  const t = useTranslations("CookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: true }));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: false }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__inner}>
        <div className={styles.banner__content}>
          <p className={styles.banner__title}>{t("title")}</p>
          <p className={styles.banner__description}>
            {t("description")}{" "}
            <Link href="/cookie-policy" className={styles.banner__link}>
              {t("privacyLink")}
            </Link>
          </p>
        </div>
        <div className={styles.banner__actions}>
          <button
            type="button"
            onClick={handleDecline}
            className={`${styles.banner__btn} ${styles["banner__btn--decline"]}`}
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className={`${styles.banner__btn} ${styles["banner__btn--accept"]}`}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
