import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
      <footer className="bg-black text-white px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
      <div>
        <h4 className="font-bold mb-2">ShopNest</h4>
        <p>Subscribe</p>
        <p>Get 10% off your first order</p>
        <div className="flex mt-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 text-white rounded-l-md"
          />
          <button className="bg-red-500 px-3 py-2 rounded-r-md">→</button>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">Support</h4>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>shopnest@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      <div>
        <h4 className="font-bold mb-2">Account</h4>
        <p>My Account</p>
        <p>Login / Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
        <p>Shop</p>
      </div>

      <div>
        <h4 className="font-bold mb-2">Quick Link</h4>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>

      <div>
        <h4 className="font-bold mb-2">Download App</h4>
        <p>Save $3 with App New User Only</p>
        <div className="flex space-x-2 mt-2">
          <img src="/images/google-play.png" alt="Google Play" className="h-10" />
          <img src="/images/app-store.png" alt="App Store" className="h-10" />
        </div>
        <div className="flex space-x-3 mt-4 text-xl">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>
      </div>
    </footer>
    );
};