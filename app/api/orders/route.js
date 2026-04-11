import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { NextResponse } from 'next/server';
import { getAuthUser } from "@/lib/auth";
import Customer from "@/models/Customer";
import User from "@/models/User";
import Product from '@/models/Product';
import mongoose from 'mongoose';



// get all orders for admins
export async function GET(request) {

  const user = await getAuthUser();
  
  console.log("user", user)

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectMongo();

  const userData = await User.findById(user.id)

  if (userData.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  try {

    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit).populate('user'),
      Order.find().countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      orders,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });




    //const orders = await Order.find().populate('user', 'fullName email').sort({"createdAt":-1});
    //return Response.json({ message: "Success!", orders }, { status: 200 });
  } catch (error) {
    console.log("Error:", error)
    return Response.json({ message: "Failed!", error }, { status: 500 });
  }

  
}

//create Order
/*
export async function POST(req) {
  
  await connectMongo();
  const body = await req.json();
  // console.log("Request Data", body);

  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userId,
      referredBy,
      discount,
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ error: 'No order items' }, { status: 400 });
    }

    const newOrder = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      referredBy,
      discount,
    });

    //console.log("new order:", )

    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create order', error }, { status: 500 });
  }  


  
}
*/

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

async function validateAndPriceOrderItems(orderItems = []) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error('No order items');
  }

  const validatedItems = [];
  let itemsPrice = 0;

  for (const item of orderItems) {
    const quantity = Number(item.quantity);

    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      throw new Error(`Invalid product ID: ${item.productId}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product ${item.productId}`);
    }

    const product = await Product.findById(item.productId).lean();

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    let unitPrice = 0;
    let variationId = item.variationId || null;
    let variationLabel = '';
    let selectedVariation = null;

    if (product.isVariable) {
      if (!variationId || !mongoose.Types.ObjectId.isValid(variationId)) {
        throw new Error(`Variation ID is required for variable product ${product._id}`);
      }

      const variations = Array.isArray(product.variations) ? product.variations : [];

      selectedVariation = variations.find(
        (v) => String(v._id || v.id) === String(variationId)
      );

      if (!selectedVariation) {
        throw new Error(`Variation not found for product ${product._id}`);
      }

      unitPrice = Number(selectedVariation.price ?? 0);
      variationLabel = selectedVariation.label || '';

      if (typeof selectedVariation.stock === 'number' && selectedVariation.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name} - ${variationLabel}`);
      }
    } else {
      unitPrice = Number(product.price ?? 0);

      if (typeof product.stock === 'number' && product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      variationId = null;
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new Error(`Invalid price for product ${product.name}`);
    }

    const lineTotal = round2(unitPrice * quantity);
    itemsPrice = round2(itemsPrice + lineTotal);

    validatedItems.push({
      product: product._id, // use this if your Order schema expects product ref
      productId: product._id, // keep if your current schema uses productId
      name: product.name,
      image: product.image || product.thumbnail || item.image || '',
      isVariable: !!product.isVariable,
      variation: product.isVariable
        ? {
            id: selectedVariation?._id,
            label: variationLabel,
            unit: selectedVariation?.unit || '',
          }
        : undefined,
      variationId,
      variationLabel,
      price: unitPrice,
      quantity,
      lineTotal,
    });
  }

  const discount = 0;
  const taxPrice = 0;
  const shippingPrice = itemsPrice >= 200 ? 0 : round2(itemsPrice * 0.3);
  const totalPrice = round2(itemsPrice - discount + shippingPrice + taxPrice);

  return {
    validatedItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    discount,
    totalPrice,
  };
}

export async function POST(req) {
  await connectMongo();

  try {
    const body = await req.json();

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      userId,
      referredBy,
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ error: 'No order items' }, { status: 400 });
    }

    const pricing = await validateAndPriceOrderItems(orderItems);

    const newOrder = new Order({
      user: userId,
      orderItems: pricing.validatedItems,
      shippingAddress,
      paymentMethod: paymentMethod || '',
      itemsPrice: pricing.itemsPrice,
      shippingPrice: pricing.shippingPrice,
      taxPrice: pricing.taxPrice,
      totalPrice: pricing.totalPrice,
      referredBy,
      discount: pricing.discount,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
