import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();

  // const [sellerDetails, setSellerDetails] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/admin")
  }

  const seller = sessionStorage.getItem("sellerData");  
  const sellername = seller ? JSON.parse(seller).sellername : null;  

  const handleDetail = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    console.log(token);
    

    fetch('http://localhost:2000/seller', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // setSellerDetails(data);
        setShowProfile(!showProfile);
      })

  }


  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-md md:text-xl font-bold text-gray-800">
            MyStore
          </Link>
          <div className='flex space-x-4'>
            <h2 className='text-white bg-blue-500 text-[14px] px-2 sm:px-3 sm:py-1 rounded-full font-bold sm:font-extrabold cursor-pointer' onClick={handleDetail}>{sellername.slice(0, 1).toUpperCase()}</h2>
            <Link
              to="/Admin"
              className='font-semibold sm:font-bold sm:mt-1'
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
      {showProfile && sellername && (
        <div className="fixed top-16 right-4 bg-white shadow-md rounded-md w-64 p-4 border border-gray-200 z-50">
          <p className="text-sm text-gray-600"><strong>Sellername:</strong> {sellername} </p>
        </div>
      )}
    </>
  )
}
