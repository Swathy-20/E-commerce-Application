import React from "react";
import { ProductCards } from "../../components/user/Card";
import { ProductCardSkeltons } from "../../components/user/Skeltons";
import { useFetch } from "../../hooks/useFetch";

export const Products = () => {
    
    const [productList, isLoading] = useFetch("/product/productList");

    if (isLoading) {
        return <ProductCardSkeltons />;
    }

    return (
        <div className="bg-white">
        <h2 className="text-2xl font-semibold mb-6 bg-white text-black">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {productList.map((value) => (
                <ProductCards product={value} key={value?._id} />
            ))}
            
        </div>
        </div>

    );
};