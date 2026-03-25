"use client";

import styles from "./styles.module.scss";

import { Tag, ProjectCard } from "@/components/ui";
import useScreenSize from "@/hooks/useScreenSize";
import { TProjectCard, TProjectCategory } from "@/types";
import { useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Fade } from "@/components/ui/Fade";
import { BlurIn } from "@/components/ui/BlurIn";

type TProps = {
  projects: TProjectCard[];
  categories: TProjectCategory[];
};

const Projects = ({ projects, categories }: TProps) => {
  const [selectedCategories, setSelectedCategories] = useState<
    TProjectCategory[]
  >([]);
  const { isLg } = useScreenSize();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const toggleCategory = (category: TProjectCategory) => {
    setSelectedCategories((prev) => {
      const isAlreadySelected = prev.some((item) => item._id === category._id);

      if (isAlreadySelected) {
        return prev.filter((item) => item._id !== category._id);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategories.length === 0) {
      return projects;
    }

    const selectedCategoryIds = selectedCategories.map((cat) => cat._id);

    return projects.filter((project) =>
      selectedCategoryIds.includes(project.category?._id),
    );
  }, [projects, selectedCategories]);

  const sortArray = (arr: TProjectCard[]): TProjectCard[][] => {
    const columnsArr: TProjectCard[][] = [[], [], []];
    const projectsToSort = [...arr];

    projectsToSort.forEach((card, index) => {
      if (index % 3 === 0) {
        columnsArr[2].push(card);
      } else if (index % 3 === 1) {
        columnsArr[1].push(card);
      } else {
        columnsArr[0].push(card);
      }
    });

    return columnsArr;
  };

  const sortedCards: TProjectCard[][] = useMemo(() => {
    return sortArray(filteredProjects);
  }, [filteredProjects, selectedCategories]);

  const availableCategories = useMemo(() => {
    return categories.filter((category) =>
      projects.some((project) => project.category?._id === category._id),
    );
  }, [categories, projects]);

  return (
    <>
      <section className={styles.projects}>
        <Fade direction="down">
          <div className={styles.projects__filter}>
            {availableCategories?.map((category, i) => {
              const isActive = selectedCategories.some(
                (item) => item?._id === category?._id,
              );
              return (
                <Tag
                  text={category.categoryName}
                  isActive={isActive}
                  onClick={() => toggleCategory(category)}
                  key={i}
                />
              );
            })}
          </div>
        </Fade>

        <BlurIn>
          <div className={styles.projects__list}>
            {!isLg
              ? sortedCards.map((column, columnId) => {
                  if (!column.length) return null;
                  else
                    return (
                      <div
                        className={`${styles.projects__column} ${styles[`projects__column--${columnId + 1}`]}`}
                        key={columnId}
                      >
                        {column.map((card, i) => (
                          <ProjectCard
                            className={styles.projects__card}
                            project={card}
                            key={i}
                          />
                        ))}
                      </div>
                    );
                })
              : filteredProjects.map((card, i) => (
                  <ProjectCard
                    className={styles.projects__card}
                    project={card}
                    key={i}
                  />
                ))}
          </div>
        </BlurIn>
      </section>
    </>
  );
  ``;
};

export default Projects;
