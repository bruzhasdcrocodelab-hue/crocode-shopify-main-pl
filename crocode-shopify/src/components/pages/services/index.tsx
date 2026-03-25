"use client";

import { ServiceBlock, VideoSection } from "@/components/sections";
import { Background, Section } from "@/components/ui";
import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme";
import { TServiceCategoryWithServices } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./styles.module.scss";
import StaggeredFade from "@/components/ui/StaggeredFade";
import { Fade } from "@/components/ui/Fade";
type TProps = {
  serviceCategories: TServiceCategoryWithServices[];
};

const ServicesPage = ({ serviceCategories }: TProps) => {
  useDarkThemeForHeader();
  const t = useTranslations("ServicesPage");

  return (
    <Section isBlack>
      <Background
        desktop="/images/background/bg-black-ball-toll.webp"
        alt="background black with balls"
      />
      <div className={styles.services}>
        <div className={styles.services__inner}>
          {/* Hero Section */}
          <div className={styles.services__heroSection}>
            <h1 className={styles.services__title}>
              <StaggeredFade text={t("title")} isInView={true} />
            </h1>
            <div className={styles.services__hero}>
              <div className={styles.services__heroContent}>
                <Fade direction="up">
                  <div className={styles.services__description}>
                    <p>{t("hero.description")}</p>
                  </div>
                </Fade>
              </div>
              <Fade direction="up">
                <nav className={styles.services__navigation}>
                  {serviceCategories.map((category, index) => (
                    <Link
                      key={category._id}
                      href={`/services/${category.slug.current}`}
                      className={styles.services__navLink}
                    >
                      <span className={styles.services__navNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.services__navText}>
                        {category.categoryName}
                      </span>
                    </Link>
                  ))}
                </nav>
              </Fade>
            </div>
          </div>

          {/* Service Blocks */}
          <div className={styles.services__blocks}>
            {serviceCategories.slice(0, 2).map((category) => (
              <ServiceBlock
                key={category._id}
                id={category.slug.current}
                title={category.categoryName}
                description={category.description || ""}
                imageUrl={category.categoryImage?.image?.asset?.url}
                imageAlt={
                  category.categoryImage?.altText || category.categoryName
                }
                services={category.services}
                buttonText={t("services.development.button")}
                buttonHref={`/services/${category.slug.current}`}
              />
            ))}
            <VideoSection
              videoUrl={t("video.videoUrl")}
              videoUrlMobile={t("video.videoUrlMobile")}
              videoTitle={t("video.title")}
              isDark
            />
            {serviceCategories.slice(2).map((category) => (
              <ServiceBlock
                key={category._id}
                id={category.slug.current}
                title={category.categoryName}
                description={category.description || ""}
                imageUrl={category.categoryImage?.image?.asset?.url}
                imageAlt={
                  category.categoryImage?.altText || category.categoryName
                }
                services={category.services}
                buttonText={t("services.development.button")}
                buttonHref={`/services/${category.slug.current}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ServicesPage;
