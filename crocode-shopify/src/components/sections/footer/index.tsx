"use client";

import styles from "./styles.module.scss";

import { Button, ClutchWidget, TextType, PartnerWidget } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fade } from "@/components/ui/Fade";
import { BlurIn } from "@/components/ui/BlurIn";
import { NETWORK } from "./data";

type TFooterColumn = {
  title: string;
  nav: {
    text: string;
    href: string;
  }[];
};

const Footer = () => {
  const t = useTranslations("Footer");

  const COLUMN1: TFooterColumn = {
    title: t("columns.what-we-do.title"),
    nav: [
      { text: t(`columns.what-we-do.nav.our-work`), href: "/our-work" },
      { text: t(`columns.what-we-do.nav.services`), href: "/services" },
      { text: t(`columns.what-we-do.nav.about-us`), href: "/about-us" },
      { text: t(`columns.what-we-do.nav.why-crocode`), href: "/why-crocode" },
      { text: t(`columns.what-we-do.nav.faqs`), href: "/faqs" },
    ],
  };

  const COLUMN2: TFooterColumn = {
    title: t("columns.get-in-touch.title"),
    nav: [
      { text: t(`columns.get-in-touch.nav.email`), href: "/contact" },
      { text: t(`columns.get-in-touch.nav.contact`), href: "/contact" },
    ],
  };

  return (
    <footer className={styles.footer}>
      <Image src="/images/background/bg_footer.webp" fill alt="bg" />
      <div className={styles.footer__inner}>
        <div className={styles.footer__content}>
          <div className={styles.footer__info}>
            <BlurIn>
              <TextType
                text={t("message")}
                as={"p"}
                className={styles.footer__message}
              />
            </BlurIn>

            <BlurIn>
              <div className={styles.footer__buttons}>
                <Button
                  as="link"
                  href="/contact"
                  text={t("buttons.contact.text")}
                  styleType="secondary"
                />
              </div>
              <div className={styles.footer__network}>
                <div className={styles.footer__widgets}>
                  <Link
                    href="https://clutch.co/profile/crocode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footer__widget_link}
                  >
                    <ClutchWidget />
                  </Link>
                  <Link
                    href={
                      "https://www.shopify.com/partners/directory/partner/krokod-sp-z-o-o"
                    }
                    target="_blank"
                    className={styles.footer__widget_link}
                  >
                    <PartnerWidget />
                  </Link>
                </div>
              </div>
            </BlurIn>
          </div>

          <Fade direction="up">
            <div className={styles.footer__menu}>
              <ColumnNav column={COLUMN1} />
              <ColumnNav column={COLUMN2} />
            </div>
          </Fade>
        </div>

        <Fade direction="down">
          <div className={styles.footer__bottom}>
            <div className={styles.footer__network_items}>
              {NETWORK.map((item, i) => (
                <Link
                  className={styles.footer__network_link}
                  href={item.href}
                  target="_blank"
                  key={i}
                >
                  <item.icon />
                </Link>
              ))}
            </div>

            <div className={styles.footer__bottom_inner}>
              <div className={styles.footer__bottom_content}>
                <Link className={styles.footer__logo} href={"/"}>
                  Crocode
                </Link>
                <p className={styles.footer__copyright}>{t("copyright")}</p>
              </div>
              <nav className={styles.footer__nav}>
                <Link
                  className={styles.footer__nav_item}
                  href={"/privacy-policy"}
                >
                  {t("legal.privacyPolicy")}
                </Link>
                <Link
                  className={styles.footer__nav_item}
                  href={"/cookie-policy"}
                >
                  {t("legal.cookiePolicy")}
                </Link>
              </nav>
            </div>
          </div>
        </Fade>
      </div>
    </footer>
  );
};

export default Footer;

const ColumnNav = ({ column }: { column: TFooterColumn }) => {
  return (
    <div className={styles.footer__column}>
      <p className={styles.footer__column_title}>{column.title}</p>
      {column.nav.map((item, i) => (
        <Link href={item.href} className={styles.footer__list_item} key={i}>
          {item.text}
        </Link>
      ))}
    </div>
  );
};
