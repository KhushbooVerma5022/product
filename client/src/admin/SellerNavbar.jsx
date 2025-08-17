import React from "react";
import { useNavigate } from "react-router-dom";

export default function SellerNavbar() {
    const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center text-xl font-bold text-blue-600">
            SellerZone
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50" onClick={() => navigate('/admin/signIn')}>
              Sign In
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 " onClick={() => navigate('/admin/signUp')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
