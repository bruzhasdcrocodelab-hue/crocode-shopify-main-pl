import { LinkedinIcon, TikTokIcon, YoutubeIcon } from "@/components/icons";
import { JSX } from "react";

export type TNetwork = {
  href: string;
  icon: () => JSX.Element;
};

export const NETWORK: TNetwork[] = [
  {
    href: "www.youtube.com/@crocodelab",
    icon: YoutubeIcon,
  },
  {
    href: "https://www.linkedin.com/company/crocodelab/",
    icon: LinkedinIcon,
  },
  {
    href: "https://www.tiktok.com/@crocodelab",
    icon: TikTokIcon,
  },
];
