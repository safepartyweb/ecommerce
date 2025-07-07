import React from "react";
import Image from "next/image";

const SingProductItemforGrid = ({ product }) => {
  // console.log("Product from single product item for grid:", product);
  return (
    <div className="flex flex-col gap-4">

      <Image className="rounded mx-auto" src={product.images[0].url} width={300} height={300} alt={product.title} />
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        {product.weight ? (
          <p>Quantity: {product.weight} {product.unit}</p>
        ) : ''}
        {product.category ? (
          <p>Category: {product.category.name}</p>
        ) : ''}
        
      </div>
    </div>
  );
};

export default SingProductItemforGrid;
