import React from "react";
import { useFetch } from "../../hooks/useFetch";
import {loadStripe }  from "@stripe/stripe-js"
import { axiosInstance } from "../../config/axiosInstance";


export const CartPage = () => {
    const [cartData, isLoading, error] = useFetch("/cart/get-cart-details");
    const errorMessage = error?.response?.data?.message || "unable to fetch cart";
   
    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartData?.products },
            });

            console.log(session, "=======session");
            const result = stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemove = async (productId) => {
        try {
            const response = await axiosInstance({ method: "DELETE", data: {productId } ,url: "/cart/remove-from-cart" });
            
             
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };
    const getTotal = () => {
        return cartData?.products?.reduce((total, item) => {
            return total + item?.productId?.price * item?.quantity;
        }, 0) || 0;
    };
    if (isLoading) return <p className="text-center">Loading...</p>;

    if (error) return <p>{errorMessage} </p>;

    return (
        <div className="p-6 bg-white text-gray-800">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Cart Items */}
                <div className="lg:w-8/12 w-full">
                    <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>
                    {cartData?.products?.length > 0 ? (
                        cartData.products.map((item) => (
                            <div key={item._id} className="flex items-center gap-5 bg-gray-100 p-4 rounded-md mb-4">
                                <img className="h-20 w-20 object-cover rounded" src={item?.productId?.images} alt="product" />
                                <div className="flex-1">
                                    <h3 className="font-medium">{item?.productId?.name}</h3>
                                    <p>Price: ${item?.productId?.price}</p>
                                    <p>Quantity: {item?.quantity}</p>
                                    <p className="text-sm text-gray-600">Subtotal: ${item?.productId?.price * item?.quantity}</p>
                                </div>
                                <button
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                    onClick={() => handleRemove(item.productId._id)}
                                >
                                    Remove
                                </button>
                                
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Payment Summary */}
                <div className="lg:w-4/12 w-full bg-gray-100 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-center">Payment Details</h2>
                    <div className="flex justify-between text-lg mb-2 text-gray-800">
                        <span>Subtotal:</span>
                        <span>${getTotal()}</span>
                    </div>
                    <div className="flex justify-between text-lg mb-2 text-gray-800">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Total:</span>
                        <span>${getTotal()}</span>
                    </div>
                    <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all"
                        onClick={makePayment}
                        disabled={cartData?.products?.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};