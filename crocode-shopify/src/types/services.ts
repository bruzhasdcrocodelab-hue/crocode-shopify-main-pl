export type TServiceCategory = {
  _id: string;
  categoryName: string;
  slug: { current: string };
  description?: string;
  text?: string;
  categoryImage?: {
    image: { asset: { url: string } };
    altText: string;
  };
  order?: number;
}

export type TServiceCard = {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    _id: string;
    categoryName: string;
  };
  order?: number;
}

export type TServiceOffer = {
  title: string;
  text: string;
}

export type TServiceDetail = {
  title: string;
  text: string;
}

export type TService = {
  _id: string;
  language: string;
  title: string;
  slug: { current: string };
  heroSubtitle?: string;
  heroImage?: {
    image: { asset: { url: string } };
    altText: string;
  };
  category: {
    _id: string;
    categoryName: string;
    slug: { current: string };
  };
  descriptionTitle?: string;
  descriptionText: string;
  whyShopifyTitle?: string;
  whyShopifyText?: string;
  whyShopifyFinalText?: string;
  offers?: TServiceOffer[];
  details?: TServiceDetail[];
  videoTitle?: string;
  videoUrl?: string;
  seo?: any;
}

export type TServicesGrouped = {
  [categoryId: string]: {
    category: TServiceCategory;
    services: TServiceCard[];
  }
}

export type TServiceCategoryWithServices = TServiceCategory & {
  services: TServiceCard[];
}
