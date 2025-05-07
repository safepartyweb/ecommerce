import connectMongo from "@/lib/db";

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

  const { price_amount, price_currency, order_id } = reqBody;

  console.log("Payment Data:",price_amount, price_currency, order_id )
  
  
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
  



  //return Response.json({ message: "Payment backend test!", }, { status: 200 })
  
}