"use client";

import { useEffect, useRef } from "react";
import { trackProductView } from "@/lib/analytics/product";

export default function ProductViewTracker({ product }) {
  const trackedProduct = useRef(null);

  useEffect(() => {
    if (!product?._id) return;

    // Prevent duplicate tracking for the same product
    if (trackedProduct.current === product._id) return;

    trackProductView(product);

    trackedProduct.current = product._id;
  }, [product]);

  return null;
}