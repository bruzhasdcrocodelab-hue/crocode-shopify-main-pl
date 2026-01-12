import { useTranslations } from "next-intl";
import { JSX } from "react";

type TProps = {
  className?: string;
  translationKey: string;
  tag?: keyof JSX.IntrinsicElements;
  isRawKey?: boolean;
}

const RichText = ({translationKey, tag: Tag = 'div', isRawKey = true,  className }: TProps) => {
  const t = useTranslations();
  const html = isRawKey ? t.raw(translationKey) : translationKey;
  
  return <Tag className={className|| ''} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RichText