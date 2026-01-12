export const getProjectCategories = (lang: string = 'en') => `
  query {
  allProjectCategories(where: { language: { eq: "${lang}" } }) {
  	_id
    language
    categoryName
  }
}
`;