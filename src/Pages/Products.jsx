
import React, { useEffect, useState } from 'react';
import Product from '../Components/Product';

const Products = () => {
  const [products, setProducts] = useState([])
  const [sortPrice, setSortPrice] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);
  

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      if (sortPrice === 'lowToHigh') {
        return a.price - b.price;
      }
      if (sortPrice === 'highToLow') {
        return b.price - a.price;
      }
    }

    if (sortBy === 'rating') {
      if (sortRating === "lowToHigh") {
        return a.rating.rate - b.rating.rate;
      }

      if (sortRating === "highToLow") {
        return b.rating.rate - a.rating.rate;
      }
    }

    return 0;

  })

  return (
   
<div>
      <h3>Products</h3>
      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <label>Sort by Price: </label>
      <select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
        <option value="">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
      <label>Sort by Rating: </label>
      <select value={sortRating} onChange={(e) => setSortRating(e.target.value)}>
        <option value="">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
      <div>
        {sortedProducts.map(prod => (
          <Product
            title={prod.title}
            price={prod.price}
            category={prod.category}
            image={prod.image}
            rating={prod.rating.rate}
          />
        ))}
      </div>
    </div>
  )
}

export default Products