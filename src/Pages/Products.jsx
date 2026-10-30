import React, { useEffect, useState } from 'react';
import Product from '../Components/Product';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  // Sorting
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
      if (sortRating === 'lowToHigh') {
        return a.rating.rate - b.rating.rate;
      }

      if (sortRating === 'highToLow') {
        return b.rating.rate - a.rating.rate;
      }
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Previous Page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next Page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-5">

      <h3 className="text-3xl font-bold mb-5">Products</h3>

      {/* Sorting */}
      <div className="flex flex-wrap gap-4 mb-6">

        <div>
          <label>Sort By: </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div>
          <label>Sort Price: </label>
          <select
            value={sortPrice}
            onChange={(e) => {
              setSortPrice(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div>
          <label>Sort Rating: </label>
          <select
            value={sortRating}
            onChange={(e) => {
              setSortRating(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Rating: Low to High</option>
            <option value="highToLow">Rating: High to Low</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {currentProducts.map(prod => (
          <Product
            key={prod.id}
            title={prod.title}
            price={prod.price}
            category={prod.category}
            image={prod.image}
            rating={prod.rating.rate}
          />
        ))}

      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center items-center gap-5 mt-8">

        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Products;
