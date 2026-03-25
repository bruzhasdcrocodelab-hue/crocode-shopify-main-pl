"use client";

import useScreenSize from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";

const StickySectionsWrapper = ({ children, className }: any) => {
  const size = useScreenSize();
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    setCurrentHeight(size.height);
  }, [size, size.height]);

  return <div className={className}>{children}</div>;
};

export default StickySectionsWrapper;
