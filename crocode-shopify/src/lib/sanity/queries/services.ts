export const getServiceCategoriesWithServices = (lang: string = 'en') => `
{
  "serviceCategories": *[_type == "serviceCategories" && language == "${lang}"] | order(order asc) {
    _id,
    categoryName,
    "slug": {"current": slug.current},
    description,
    categoryImage {
      "image": {"asset": {"url": image.asset->url}},
      altText
    },
    order,
    "services": *[_type == "services" && language == "${lang}" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": {"current": slug.current},
      order
    }
  }
}
`;

export const getServicesForDropdown = (lang: string = 'en') => `
{
  "allServiceCategories": *[_type == "serviceCategories" && language == "${lang}"] | order(order asc) {
    _id,
    categoryName,
    "slug": {"current": slug.current},
    order
  },
  "allServices": *[_type == "services" && language == "${lang}"] | order(order asc) {
    _id,
    title,
    "slug": {"current": slug.current},
    category-> {
      _id,
      categoryName
    },
    order
  }
}
`;

export const getServiceBySlug = (slug: string, lang: string = 'en') => `
{
  "allServices": *[_type == "services" && slug.current == "${slug}" && language == "${lang}"] {
    _id,
    language,
    title,
    "slug": {"current": slug.current},
    heroSubtitle,
    heroImage {
      "image": {"asset": {"url": image.asset->url}},
      altText
    },
    category-> {
      _id,
      categoryName,
      "slug": {"current": slug.current}
    },
    descriptionTitle,
    descriptionText,
    whyShopifyTitle,
    whyShopifyText,
    offers[] {
      title,
      text
    },
    whyShopifyFinalText,
    details[] {
      title,
      text
    },
    videoTitle,
    videoUrl,
    seo {
      title,
      description,
      keywords,
      ogType,
      image {
        "image": {"asset": {"url": image.asset->url}},
        altText
      }
    }
  }
}
`;

export const getAllServices = (lang: string = 'en') => `
{
  "allServices": *[_type == "services" && language == "${lang}"] {
    _id,
    title,
    "slug": {"current": slug.current},
    language
  }
}
`;

export const getServiceCategoryBySlug = (slug: string, lang: string = 'en') => `
{
  "serviceCategory": *[_type == "serviceCategories" && slug.current == "${slug}" && language == "${lang}"][0] {
    _id,
    categoryName,
    "slug": {"current": slug.current},
    description,
    text,
    categoryImage {
      "image": {"asset": {"url": image.asset->url}},
      altText
    },
    order,
    "services": *[_type == "services" && language == "${lang}" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": {"current": slug.current},
      order
    }
  }
}
`;
