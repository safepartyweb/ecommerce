export const trackEcommerceEvent = (event, ecommerce) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event,
    ecommerce,
  });
};