import styles from "./styles.module.scss";

import Link from "next/link";

type TButton = {
  as: 'button' | 'link';
  children?: React.ReactNode;
  text?: string;
  className?: string;
  styleType?: 'primary' | 'secondary'
}

type ButtonAsButton = TButton &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TButton> & {
    href?: never;
  };

type ButtonAsLink = TButton &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TButton> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({children, className, text, as, styleType = 'primary', ...props}: ButtonProps) => {

  if (as === 'link') {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link 
      href={href} 
      className={`
        ${styles.button} 
        ${styleType == "primary" ? styles.button__primary : styles.button__secondary } 
        ${styleType == "primary" ? text ? styles['button__primary--text'] : '' : text ? styles['button__secondary--text'] : ''} 
        ${className}
        `} 
      {...rest}
      >
        {text 
          ? <span className={styles.button__text}>{text}</span>
          : children
        }
      </Link>
    );
  } else if (as === 'button') {
    const { ...buttonProps } = props as ButtonAsButton;
    return (
      <button className={`
      ${styles.button} 
      ${styleType == "primary" ? styles.button__primary : styles.button__secondary } 
      ${styleType == "primary" ? text ? styles['button__primary--text'] : '' : text ? styles['button__secondary--text'] : ''} 
      ${className}`
      } 
      {...buttonProps}>
        {text 
          ? <span className={styles.button__text}>{text}</span>
          : children
        }
      </button>
    );
  } else {
    return null
  }
}

export default Button;