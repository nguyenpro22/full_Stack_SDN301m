"use client";

import { useState } from "react";
import { useEventListener, useIsomorphicLayoutEffect } from "@/hooks";

interface IDocumentSize {
  width: number;
  height: number;
}

const useDocumentSize = (): DocumentSize => {
  const [documentSize, setDocumentSize] = useState<DocumentSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setDocumentSize({
      width: document.body.offsetWidth,
      height: document.body.offsetHeight,
    });
  };

  useEventListener("resize", handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return documentSize;
};

export default useDocumentSize;
