import mongoose from 'mongoose';
import Product from './Product';
import Customer from './Customer';
import Affiliate from '@/models/Affiliate'





const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    image: String,
    isVariable:{
      type:Boolean,
      required:true
    },
    variationId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
    },
    variationLabel: String, // e.g., "10g"
    unit: String,           // e.g., "g", "ml"
    price: Number,          // price of selected variation

    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderItems: [orderItemSchema],

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
    },

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
      amount: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,

    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },

    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Affiliate',
      default: null,
    }




  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
