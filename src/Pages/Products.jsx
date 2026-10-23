
import React, { useEffect, useState } from 'react';
import Product from '../Components/Product';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map(prod => (
        <Product
          key={prod.id}
          title={prod.title}
          price={prod.price}
          category={prod.category}
          image={prod.image}
        />
      ))}
    </div>
  );
};

export default Products;
