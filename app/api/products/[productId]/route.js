import connectMongo from "@/lib/db";
import Product from "@/models/Product";


//get single product
export async function GET(req, { params }) {
  const {productId} = params
  console.log("productId",productId)
  const product = await Product.findById(productId)

  return Response.json({ message: "success!",product }, { status: 200 });
}

/*
export async function POST(req) {

  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const images = JSON.parse(data.images);

  const title = data.title;
  const price = data.price;
  const stock = data.stock;
  const description = data.description;
  const bestSeller = data.bestSeller;
  // console.log("data",title, price, stock, description,images  )
  console.log("bestSeller",bestSeller  )


  try {
    const newProduct = await Product.create({title,price,stock,description,images,bestSeller })
    return Response.json({ message: "success!", product:newProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

//return Response.json({ message: "test!", }, { status: 200 })
  
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

*/
