import React from 'react';
import { useCart } from '../Components/CartContext';
import { Link } from 'react-router-dom';

const Product = ({ id, title, image, price, category, rating }) => {

    const { addToCart } = useCart()

    const product = {
        id,
        title,
        price,
        category,
        rating
    }



    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 object-cover"
                />

                <div className="p-5">

                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {title}
                    </h4>

                    <p className="text-lg font-semibold text-green-600 mb-2">
                        ₹{price}
                    </p>

                    <p className="text-lg font-semibold text-green-600 mb-2">
                        {rating}
                    </p>


                    <p className="text-sm text-gray-500 mb-4">
                        {category}
                    </p>


                    <Link to="/cart" className="bg-blue-400 text-white px-4 py-2 rounded">
                        View Cart
                    </Link>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Add to Cart
                    </button>


                </div>
            </div>
        </div>

    );
}

export default Product;

// import React from 'react';
// import { useCart } from './Components/CartContext';

// const Product = ({ id, title, price, catirgory }) => {

//     const { addToCart } = useCart()

//     const product = {
//         id,
//         title,
//         price,
//         catirgory
//     }


//     return (
//         <div className='product-card'>
//             <h3>title: {title} </h3>
//             <h3>price: {price} </h3>
//             <h3>catirgory: {catirgory} </h3>
//             <button onClick={()=> addToCart(product)}> Add to Card</button>
//         </div>
//     );
// }

// export default Product;
