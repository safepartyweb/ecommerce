import { pushEcommerceEvent } from "./index";

export const trackBeginCheckout = (cart) => {
  pushEcommerceEvent("begin_checkout", {
    currency: "BDT",
    value: cart.total,
    items: cart.items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

export const trackAddShippingInfo = (cart, shippingTier) => {
  pushEcommerceEvent("add_shipping_info", {
    currency: "BDT",
    value: cart.total,
    shipping_tier: shippingTier,
    items: cart.items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

export const trackAddPaymentInfo = (cart, paymentType) => {
  pushEcommerceEvent("add_payment_info", {
    currency: "BDT",
    value: cart.total,
    payment_type: paymentType,
    items: cart.items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};