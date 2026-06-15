import connectMongo from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const admin = await requireSuperAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();

    const body = await req.json();

    const method = await ShippingMethod.create({
      name: body.name,
      shortNote: body.shortNote,
      price: Number(body.price),
      deliveryTime: body.deliveryTime,
      isActive: true,
    });

    return NextResponse.json(method, { status: 201 });
  } catch (error) {
    console.log("Error on route file:", error)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}