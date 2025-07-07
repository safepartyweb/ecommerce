import mongoose from 'mongoose';
import Category from './Category';

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

  
  unit: {
    type: String,
    enum: ['Grams', 'Oz', 'Pounds'],
    //required: true,
  },
  weight: {
    type: Number,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    //required: true,
  },


  bestSeller:{
    type:Boolean
  },
  showHero:{
    type:Boolean
  },
  isFeatured:{
    type:Boolean,
    default:false,
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
