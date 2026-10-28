import React from 'react';
import brand from '../data/Brand';
import Brand from '../Components/Brand'
import { Link } from "react-router-dom";
import {
    RiShoppingBag3Line,
    RiArrowRightLine,
} from "@remixicon/react";


const About = () => {
  return (
    <main>
            {/* About Hero Section */}
            <section className="bg-light py-5">
                <div className="container py-lg-5">
                    <div className="row align-items-center g-5">
                        <div className="col-12 col-lg-6">
                            <span className="badge bg-danger-subtle text-danger px-3 py-2 mb-3">
                                <RiShoppingBag3Line className="me-2" />
                                WELCOME TO SHOPKART
                            </span>

                            <h2 className="display-5 fw-bold text-dark mb-3">
                                ABOUT US
                            </h2>

                            <h4 className="text-secondary fw-semibold mb-4">
                                Making everyday shopping simpler, faster and more enjoyable.
                            </h4>

                            <p className="text-secondary lh-lg">
                                At ShopKart, we believe great products should be accessible
                                to everyone. We are an online shopping destination offering
                                a wide range of high-quality products at great prices,
                                delivered right to your doorstep.
                            </p>

                            <p className="text-secondary lh-lg">
                                From fashion and electronics to home essentials and more —
                                we're here to make shopping easier, better, and more
                                delightful for you.
                            </p>

                            <Link
                                to="/products"
                                className="btn btn-danger btn-lg rounded-pill px-4 mt-2"
                            >
                                Shop Now <RiArrowRightLine className="ms-2" />
                            </Link>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 text-center">
                                <div className="bg-danger-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-4">
                                    <img src="https://plus.unsplash.com/premium_photo-1681398781725-17231ac90693?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="" 
                                    className="rounded-circle align-items-center justify-content-center"
                                    />
                                </div>

                                <h5 className="fw-bold text-dark">
                                    Shop Smarter, Live Better
                                </h5>

                                <p className="text-secondary mb-0">
                                    Discover products you'll love, all in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

               {/* Brands Section */}
            <section className="container py-5">
                <div className="text-center mb-5">
                    <p className="text-danger fw-semibold text-uppercase mb-2">
                        Our Partners
                    </p>

                    <h2 className="fw-bold">Brands You Love</h2>

                    <p className="text-secondary">
                        Explore popular brands available at ShopKart.
                    </p>
                </div>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3'>
                    {brand.map ((brand) => (
                        <div className='col' key={brand.id}>
                            <Brand 
                                name={brand.name}
                                image= {brand.image}
                            />
                        </div>
                    ))}

                </div>



                  </section>

            {/* Bottom Banner */}
            <section className="container pb-5">
                <div className="bg-danger text-white text-center rounded-4 p-4 p-md-5">
                    <h2 className="fw-bold mb-3">
                        Shop Smarter, Live Better
                    </h2>

                    <p className="mb-4">
                        Your next favourite product is just a click away.
                    </p>

                    <Link
                        to="/product"
                        className="btn btn-light text-danger fw-semibold rounded-pill px-4"
                    >
                        Explore Products <RiArrowRightLine className="ms-2" />
                    </Link>
                </div>
            </section>
        </main>

  );
}

export default About;
