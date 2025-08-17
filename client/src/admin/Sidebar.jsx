import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FaStore } from "react-icons/fa"; // store icon

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  const seller = sessionStorage.getItem("sellerData");
  const sellername = seller ? JSON.parse(seller).sellername : "User";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/sellerhub");
  };

  // Close sidebar on mobile
  const handleLinkClick = () => {
    if (isMobile) setOpen(false);
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 w-full z-40">
        <div className="flex items-center gap-2 text-lg font-bold">
          <FaStore />
          MyStore
        </div>
        <button onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center gap-2 border-b border-gray-700 text-xl font-bold">
          <FaStore size={22} />
          MyStore
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 p-6 text-sm flex-grow">
          <NavLink
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-blue-400"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-blue-400"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/addProduct"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-blue-400"
            }
          >
            Add Product
          </NavLink>
        </nav>

        {/* Logout button at bottom */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
