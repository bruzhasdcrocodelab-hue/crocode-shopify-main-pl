export const getProjects = (lang: string = 'en') => `
  query {
  allProjects(where: { language: { eq: "${lang}" } }) {
  	_id
    language
    title
    workDone
    slug {current}
    category {
      _id
      categoryName
    }
    cardImage {
      image {asset {url}}
      altText
    }
  }
}
`;

export const getArticleSeo = (slug: string) => `
  query {
    allBlogs(where: { 
    slug: { current: { eq: "${slug}" } } 
    }) {
    seo {
      title
      description
      keywords
      ogType
      twitterCard
      image {
        image {
          asset { url }
        }
        altText
      }
    }
  }
}
`

export const getProject = (slug: string) => `
  query {
    allProjects(where: { slug: { current: { eq: "${slug}" } } }) {
    _id
    title
    client
    workDone
    language
    slug {current}
    theme
    coverImage {
      imageDesktop {asset {url}}
      imageMobile {asset {url}}
      altText
    }
    brief {
      description
      industry
      technologies
      website {
        text
        url
      }
    }
    gallery {
      imageDesktop {asset {url}}
      imageMobile {asset {url}}
      altText
    }
    solutionRaw
  }
}
`;