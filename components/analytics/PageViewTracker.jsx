"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/page";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPage = useRef(null);

  useEffect(() => {
    if (pathname.startsWith("/products/")) return;

    const pageKey = `${pathname}?${searchParams.toString()}`;

    // Prevent duplicate tracking for the same URL
    if (lastTrackedPage.current === pageKey) return;

    lastTrackedPage.current = pageKey;

    trackPageView();
  }, [pathname, searchParams]);

  return null;
}