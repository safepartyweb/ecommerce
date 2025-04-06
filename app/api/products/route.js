import connectMongo from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  return Response.json({ message: "Hello from product GET route!" }, { status: 200 });
}


export async function POST(req) {
  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  console.log("data",data)

  try {
    const newProduct = await Product.create(data)
    return Response.json({ message: "success!", product:newProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }
  
}


export async function PATCH(req) {

  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  console.log("data",data)
  const productId = data.productId;

  try {
    const product = await Product.findById(productId);
    if(!product){
      throw new Error("Product not found!")
    }

    product.name = data.name || product.name;
    product.price = data.price || product.price;
    product.description = data.description || product.description;

    const updatedProduct = await product.save();

    return Response.json({ message: "success!", product:updatedProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
}


export async function DELETE(req) {
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  console.log("data",data)
  const productId = data.productId;


  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      throw new Error("Product not found!")
    }

    return Response.json({ message: "deleted successfully!", product:deletedProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
  


  return Response.json({ message: "PATCH route!" }, { status: 200 });
}


