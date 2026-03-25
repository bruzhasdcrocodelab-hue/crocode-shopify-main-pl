import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/sanityImage";
import Image from "next/image";
import { Fade } from "@/components/ui/Fade";
import { BlurIn } from "@/components/ui/BlurIn";

export const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      try {
        return (
          <div datatype="image">
            <Image
              src={urlFor(value)?.url() || ""}
              alt={value.alt || "Image"}
              width={800}
              height={500}
            />
          </div>
        );
      } catch {
        return null;
      }
    },
  },
  block: {
    h1: ({ children }) => (
      <Fade direction="down">
        <h1>{children}</h1>
      </Fade>
    ),
    h2: ({ children }) => (
      <Fade direction="down">
        <h2>{children}</h2>
      </Fade>
    ),
    h3: ({ children }) => (
      <Fade direction="down">
        <h3>{children}</h3>
      </Fade>
    ),
    h4: ({ children }) => (
      <Fade direction="down">
        <h4>{children}</h4>
      </Fade>
    ),
    h5: ({ children }) => (
      <Fade direction="down">
        <h5>{children}</h5>
      </Fade>
    ),
    h6: ({ children }) => (
      <Fade direction="down">
        <h6>{children}</h6>
      </Fade>
    ),
    normal: ({ children }) => (
      <Fade direction="down">
        <p>{children}</p>
      </Fade>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong>{children}</strong>,
    code: ({ children }) => (
      <code dangerouslySetInnerHTML={{ __html: String(children) }} />
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <Fade direction="down">
        <li>{children}</li>
      </Fade>
    ),
    number: ({ children }) => (
      <Fade direction="down">
        <li>{children}</li>
      </Fade>
    ),
  },
};
