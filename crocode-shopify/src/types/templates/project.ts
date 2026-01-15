import { TImage, TImageWithAltText } from "./image"
import { PortableTextBlock } from "@portabletext/react"

export type TBrief = {
  description: string
  industry: string
  technologies: string[]
  website: {
    text: string;
    url: string;
  }
}

export type TProjectCard = {
  _id: string;
  language: string;
  title: string;
  workDone: string;
  slug: { current: string };
  cardImage: TImageWithAltText
  category: {
    _id: string;
    categoryName: string;
    // language: string;
  }
}

export type TProject = {
  _id: string;
  language: string;
  title: string;
  client: string;
  workDone: string;
  slug: { current: string };
  coverImage: {
    imageDesktop: TImage
    imageMobile: TImage
    altText: string
  };
  brief: TBrief
  gallery: {
    imageDesktop: TImage
    imageMobile: TImage
    altText: string
  }
  solutionRaw: PortableTextBlock[]
  theme: string | null
}