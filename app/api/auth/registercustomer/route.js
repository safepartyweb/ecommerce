import connectMongo from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(req) {

  return Response.json({ message: "Register Customer Route!", }, { status: 200 })
  
}


export async function POST(req) {

  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  // console.log("data",data)

  try {
    const newCustomer = await Customer.create(data)
    return Response.json({ message: "success!", customer:newCustomer,status: 201 }, { status: 201 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

}
