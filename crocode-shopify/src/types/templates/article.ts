import { TImage } from "./image";
import { PortableTextBlock } from "@portabletext/react";

type TArticles = {
  _id: string;
  language: string;
  customer: string;
  title: string;
  gallery: {
    galleryImages: {image: TImage, altText: string}[], 
  };
  contentRaw: PortableTextBlock[];
}

export default TArticles