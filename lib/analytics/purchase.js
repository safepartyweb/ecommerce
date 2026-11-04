import { pushEcommerceEvent } from "./index";

export const trackPurchase = (order) => {
  pushEcommerceEvent("purchase", {
    transaction_id: order.id,
    currency: order.currency || "BDT",
    value: order.total,
    tax: order.tax || 0,
    shipping: order.shippingCost || 0,

    items: order.items.map((item) => ({
      item_id: item.productId,
      item_name: item.productName,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};