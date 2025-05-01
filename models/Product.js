import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {type: String, unique:true},
  slug: { type: String, unique: true },
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
  },
  showHero:{
    type:Boolean
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
