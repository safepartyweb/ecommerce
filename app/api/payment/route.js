import connectMongo from "@/lib/db";
import nodemailer from 'nodemailer'
import { NextResponse } from "next/server";




//get all products
export async function GET() {
  await connectMongo();
  return Response.json({ message: "Success!", products:allProducts }, { status: 200 });
}

//create product
export async function POST(req) {
  await connectMongo();
  const reqBody = await req.json();
  // console.log("Request Data", reqBody);

  const {email, price_amount, price_currency, order_id, payment_method } = reqBody;

  console.log("Payment Data:",email, price_amount, price_currency, order_id, payment_method )
  

  if(payment_method == 'crypto'){
    
    try {
      const response = await fetch('https://api.nowpayments.io/v1/invoice', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount,
          price_currency,
          order_id,
          success_url: 'http://localhost:3000/payment-success',
          cancel_url: 'http://localhost:3000/payment-cancel',
        }),
      });
      
  
      const data = await response.json();
      //res.status(200).json(data); Returns { invoice_url: 'https://...' }
      return Response.json({ message: "Success!", data }, { status: 200 })
    } catch (error) {
      return Response.json({ message: "Failed!", }, { status: 500 })
    }
  }


  if(payment_method == 'interac'){

      try {

        const emails = ['topconstruction68@proton.me','kkmarketing12@proton.me','wwmarketing68@protonmail.com','greenconstruction55@proton.me'];
        const randomEmail = emails[Math.floor(Math.random() * emails.length)]
  
        // Email content
        const subject = `Your Order #${order_id} - Payment Instructions`
        const html = `
          <p>Thank you for your order!</p>
          <p>Please send an Interac e-Transfer of <strong>$${price_amount}</strong> to the following email:</p>
          <h3>${randomEmail}</h3>
          <p>Use your Order ID <strong>${order_id}</strong> as the message/reference.</p>
          <p>We'll process your order once the payment is received.</p>
        `
  
        // Send email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })      
  
        await transporter.sendMail({
          from: `"Safe Party" <${process.env.EMAIL_USER}>`,
          to: email,
          // to: 'mahmud.online11@gmail.com',
          subject,
          html,
        })
  
        return NextResponse.json({ message: 'Payment instructions sent', email: randomEmail })        
        

      } catch (error) {
        
        console.error(error)
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 })


      }



  




  }
  

  



  //return Response.json({ message: "Payment backend test!", }, { status: 200 })
  
}