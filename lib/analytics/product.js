
import { pushEcommerceEvent } from "./index";

export const trackProductView = (product) => {
  if (!product) return;

  const price = product.isVariable
    ? Math.min(
        ...(product.variations || []).map((variation) =>
          Number(variation.price)
        )
      )
    : Number(product.price || 0);

  const safePrice = Number.isFinite(price) ? price : 0;

  pushEcommerceEvent("view_item", {
    currency: "CAD",
    value: safePrice,
    items: [
      {
        item_id: product._id,
        item_name: product.title,
        item_category: product.category?.name || "",
        price: safePrice,
        quantity: 1,
      },
    ],
  });
};
