export const initializeDataLayer = () => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
};

export const pushToDataLayer = (data) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push(data);
};

export const pushEcommerceEvent = (event, ecommerce) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    ecommerce: null,
  });

  window.dataLayer.push({
    event,
    ecommerce,
  });
};