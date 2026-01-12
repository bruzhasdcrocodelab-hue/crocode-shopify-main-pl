export const getArticles = (lang: string = 'en') => `
  query {
  allBlogs(where: { language: { eq: "${lang}" } }) {
     _id
    customer
    title
    language
    gallery {
      galleryImages {
        image { asset {url}}
        altText
      }
    }
    contentRaw
  }
}
`;