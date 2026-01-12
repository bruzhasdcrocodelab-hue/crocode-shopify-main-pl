import styles from "./styles.module.scss";

import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

type TButton = {
  className?: string;
  size: 'lg' | string;
  isActive?: boolean;
  hover?: boolean;
  as?: 'button' | 'link';
}

type ButtonAsButton = TButton &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TButton> & {
    href?: never;
  };

type ButtonAsLink = TButton &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TButton> & {
    href: string;
    as: 'link';
  };

type TProps = ButtonAsButton | ButtonAsLink;

const ButtonArrow = ({ className, size, isActive, as, hover, ...props }: TProps) => {

  if (as === 'link') {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link 
      href={href} 
      className={`
        ${styles.button} 
        ${styles[`button--${size}`]}
        ${isActive ? styles['button--active'] : ''}
        ${hover ? styles['button--hover'] : ''}
        ${className}`
      } 
      {...rest}>
        <span className={styles.icon}>
          <ArrowIcon/>
        </span>
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button 
      className={`
        ${styles.button} 
        ${styles[`button--${size}`]} 
        ${isActive ? styles['button--active'] : ''}
        ${hover ? styles['button--hover'] : ''}
        ${className}`
      } 
      {...buttonProps}
    >
      <span className={styles.icon}>
        <ArrowIcon/>
      </span>
    </button>
  );
}

export default ButtonArrow;