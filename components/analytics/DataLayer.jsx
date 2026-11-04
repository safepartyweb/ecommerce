"use client";

import { useEffect, Suspense } from "react";
import { initializeDataLayer } from "@/lib/analytics";
import PageViewTracker from "./PageViewTracker";

export default function DataLayer() {
  useEffect(() => {
    initializeDataLayer();
  }, []);

  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}