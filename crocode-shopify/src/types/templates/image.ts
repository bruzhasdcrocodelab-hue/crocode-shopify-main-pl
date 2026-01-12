export type TImage = {
  asset: {url: string}
}

export type TImageWithAltText = {
  image: TImage;
  altText: string;
}

export type TImagesBigAndSmall = {
  imageDesktop: TImage
  imageMobile: TImage
  altText: string
}