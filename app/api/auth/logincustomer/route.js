import connectMongo from "@/lib/db";
import Customer from "@/models/Customer";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET;


export async function POST(req) {
  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  // console.log("data",data)
  const email = data.email
  const password = data.password

  try {

    const customer = await Customer.findOne({email})
    if(!customer){
      return Response.json(
        { message: "Invalid email or password!" }, 
        { status: 401 }
      );
    }
    const isMatch = await customer.comparePassword(password);
    //console.log("isMatch", isMatch)
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password!"  }, { status: 401 })
    }

    

    const token = jwt.sign(
      { userId: customer._id.toString() }, jwtSecret, { expiresIn: '1d' }
    );
    
    const cookieStore = await cookies();
    
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60, // 1 day in seconds
      sameSite: 'strict',
      path: '/',
    });

    const userData = {
      id: customer._id,
      name: customer.name,
      email: customer.email,
    };

    return Response.json({ message: "success!", user:userData }, { status: 200 })

  } catch (error) {
    console.log("Login Error:", error)
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

}