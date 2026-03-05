"use client";

import { useEffect } from "react";
import Script from "next/script";

type TProps = {
  className?: string;
};

const ClutchWidget = ({ className }: TProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).CLUTCHCO) {
      (window as any).CLUTCHCO.Init();
    }
  }, []);

  return (
    <>
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).CLUTCHCO) {
            (window as any).CLUTCHCO.Init();
          }
        }}
      />
      <div
        className={`clutch-widget${className ? ` ${className}` : ""}`}
        data-url="https://widget.clutch.co"
        data-widget-type="14"
        data-height="50"
        data-nofollow="false"
        data-expandifr="true"
        data-scale="100"
        data-clutchcompany-id="1979032"
      />
    </>
  );
};

export default ClutchWidget;
