import { pushEcommerceEvent } from "./index";

export const trackAddToCart = (item) => {
  pushEcommerceEvent("add_to_cart", {
    currency: "CAD",
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,

        ...(item.isVariable && {
          item_variant: item.variationLabel,
        }),
      },
    ],
  });
};


export const trackViewCart = (cartItems) => {
  if (!cartItems?.length) return;

  const value = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  pushEcommerceEvent("view_cart", {
    currency: "CAD",
    value,
    items: cartItems.map((item) => ({
      item_id: item.productId,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      ...(item.isVariable && {
        item_variant: item.variationLabel,
      }),
    })),
  });
};


export const trackBeginCheckout = (cartItems) => {
  if (!cartItems?.length) return;

  const value = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  pushEcommerceEvent("begin_checkout", {
    currency: "CAD",
    value,
    items: cartItems.map((item) => ({
      item_id: item.productId,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      ...(item.isVariable && {
        item_variant: item.variationLabel,
      }),
    })),
  });
};


export const trackPurchase = (order) => {
  if (!order || !order.isPaid || !order._id) return;

  if (hasPurchaseBeenTracked(order._id)) return;

  pushEcommerceEvent("purchase", {
    transaction_id: String(order._id),
    currency: "CAD",
    value: order.itemsPrice,
    shipping: order.shippingPrice || 0,
    tax: order.taxPrice || 0,
    items: order.orderItems.map((item) => ({
      item_id: item.productId,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      ...(item.isVariable && {
        item_variant: item.variationLabel,
      }),
    })),
  });

  markPurchaseAsTracked(order._id);
};



const getTrackedPurchases = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      sessionStorage.getItem("trackedPurchases") || "[]"
    );
  } catch {
    return [];
  }
};

const hasPurchaseBeenTracked = (orderId) => {
  return getTrackedPurchases().includes(String(orderId));
};

const markPurchaseAsTracked = (orderId) => {
  if (typeof window === "undefined") return;

  const trackedOrders = getTrackedPurchases();

  if (!trackedOrders.includes(String(orderId))) {
    trackedOrders.push(String(orderId));

    sessionStorage.setItem(
      "trackedPurchases",
      JSON.stringify(trackedOrders)
    );
  }
};

/*
// without customer info:
export const trackPlaceOrder = (order) => {
  if (!order?._id || !order?.orderItems?.length) return;

  pushEcommerceEvent("place_order", {
    transaction_id: String(order._id),
    currency: "CAD",
    value: order.itemsPrice || 0,
    shipping: order.shippingPrice || 0,
    tax: order.taxPrice || 0,
    items: order.orderItems.map((item) => ({
      item_id: String(item.productId),
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      ...(item.isVariable && {
        item_variant: item.variationLabel,
      }),
    })),
  });
};
*/

export const trackPlaceOrder = (order, customer = {}) => {
  if (!order?._id || !order?.orderItems?.length) return;

  pushEcommerceEvent("place_order", {
    transaction_id: String(order._id),

    // Customer details
    customer: {
      user_id: String(customer.userId || ""),
      name: customer.name || "",
      email: customer.email || "",
      address: customer.address || "",
      city: customer.city || "",
      state: customer.state || "",
      postal_code: customer.postalCode || "",
      country: customer.country || "",
    },

    currency: "CAD",
    value: order.itemsPrice || 0,
    shipping: order.shippingPrice || 0,
    tax: order.taxPrice || 0,

    items: order.orderItems.map((item) => ({
      item_id: String(item.productId),
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      ...(item.isVariable && {
        item_variant: item.variationLabel,
      }),
    })),
  });
};