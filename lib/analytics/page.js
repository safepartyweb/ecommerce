import { pushToDataLayer } from "./index";

export const trackPageView = (pageData = {}) => {
  if (typeof window === "undefined") return;

  pushToDataLayer({
    event: "page_view",
    page_location: window.location.href,
    page_title: document.title,
    ...pageData,
  });
};