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
        <div>
            <h1>Product listing page</h1>
            {productList.map((value) => (
                <ProductCards product={value} key={value?._id} />
            ))}
        </div>
    );
};