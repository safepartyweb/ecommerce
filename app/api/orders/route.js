import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { NextResponse } from 'next/server';
import { getAuthUser } from "@/lib/auth";
import Customer from "@/models/Customer";



// get all orders
export async function GET() {

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectMongo();

  if (user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const orders = await Order.find().populate('user', 'fullName email');
    return Response.json({ message: "Success!", orders }, { status: 200 });
  } catch (error) {
    console.log("Error:", error)
    return Response.json({ message: "Failed!", error }, { status: 500 });
  }

  
}

//create Order
export async function POST(req) {
  
  await connectMongo();
  const body = await req.json();
  console.log("Request Data", body);

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
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create order', error }, { status: 500 });
  }  

  



  //return Response.json({ message: "order creation test!", }, { status: 200 })
  
}