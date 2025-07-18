import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { NextResponse } from 'next/server';
import { getAuthUser } from "@/lib/auth";
import Customer from "@/models/Customer";
import User from "@/models/User";



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