import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { getAuthUser } from "@/lib/auth";



//get single order
export async function GET(req, { params }) {

  // console.log("Individual Order route hit!")
  
  try {
    const { orderId } = await params;
    console.log("Order Id", orderId)
    
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    if (!orderId) {
      return Response.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId).populate('user');

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {

  await connectMongo();

  const data = await req.json();
  console.log("Edit order data:",data)


  try {
    const { orderId } = await params;
    // console.log("Order Id", orderId)
    
    const user = await getAuthUser();
    if (!user && user.role !=='admin' ) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    if (!orderId) {
      return Response.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    const paymentStatus = data.isPaid == 'true' ? true : false
    order.isPaid = paymentStatus
    order.status = data.status;

    const updatedOrder = await order.save();

    /*
    product.name = data.name || product.name;
    product.price = data.price || product.price;
    product.description = data.description || product.description;

    const updatedProduct = await product.save();
    */
    return Response.json({ message: "success!", order: updatedOrder}, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
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
