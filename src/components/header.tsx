import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";


const Header: React.FC = () => {
    const username = localStorage.getItem("user")
    const navigate= useNavigate()
    const cartData = useSelector((state: RootState) => state.cart.items);

    const handleCart=()=>{
        username && username!==undefined ? navigate("/cart") : navigate("/login")
    }
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">ShopStyle</h1>
                <nav className="space-x-4 pl-4">
                    <a href="/" className="text-gray-600">Home</a>
                    <a href="/" className="text-gray-600">Shop</a>
                    <a href="/" className="text-gray-600">Categories</a>
                    <a href="/" className="text-gray-600">Deals</a>
                </nav>
            </div>
            <div className="flex space-x-4 items-center">
                <div className="relative">
                    <AiOutlineShoppingCart className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" onClick={handleCart} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">{cartData?.length ? cartData.length : 0}</span>
                </div>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded"><a href="/login">Login</a></button> */}
                {!username ? <button className="bg-blue-500 text-white px-4 py-2 rounded"><a href="/login">Login</a></button>
                    : <div className="relative">
                    {/* Dropdown Toggle Button */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex space-x-2 items-center px-4 py-2   rounded-lg  cursor-pointer"
                    >
                      <FaUser />
                      <h2>{username}</h2>
                    </button>
              
                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <button
                          onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                            navigate("/");
                          }}
                          className="w-full text-center px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                }
            </div>
        </header>
    );
};

export default Header;