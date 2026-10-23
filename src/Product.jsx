import React from 'react';
import { useCart } from './Components/CartContext';

const Product = ({ id, title, price, catirgory }) => {

    const { addToCart } = useCart()

    const product = {
        id,
        title,
        price,
        catirgory
    }


    return (
        <div className='product-card'>
            <h3>title: {title} </h3>
            <h3>price: {price} </h3>
            <h3>catirgory: {catirgory} </h3>
            <button onClick={()=> addToCart(product)}> Add to Card</button>
        </div>
    );
}

export default Product;
