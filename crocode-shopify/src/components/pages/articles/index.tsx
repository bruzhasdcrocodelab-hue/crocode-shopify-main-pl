import { ArticlesSection } from "@/components/sections"
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getArticles } from "@/lib/sanity/queries/articles";
import { TArticles } from "@/types";
import { getLocale } from "next-intl/server";

const ArticlesPage = async () => {
  const locale = await getLocale()
  const { data: projectsData } = await fetchGraphQL(getArticles(locale));
  const articles: TArticles[] = projectsData?.allBlogs || [];

  return (<>
    <ArticlesSection articles={articles}/>
  </>)
}

export default ArticlesPage