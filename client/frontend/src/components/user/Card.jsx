import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCards = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="card bg-base-100 shadow-xl w-96">
            <figure>
                <img src={product?.images} alt="products" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product?.name} </h2>
                <p>Price : {product?.price}Rs </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate(`/product-detail/detailbyId/${product._id}`)}>
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};