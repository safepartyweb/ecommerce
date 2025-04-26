import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  stock: String,
  images: [
    {
      url: { type: String },
      public_id: { type: String },
    },
  ],
  // tag:{
  //   type:String,
  //   enum:['Best Seller',]
  // }
  bestSeller:{
    type:Boolean
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
