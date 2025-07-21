import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/admin")
  }

  const user = sessionStorage.getItem("userData");
  const username = user ? JSON.parse(user).username : null;

  const handleDetail = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserDetails(data);
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
            <h2 className='text-white bg-blue-500 text-[14px] px-2 sm:px-3 sm:py-1 rounded-full font-bold sm:font-extrabold cursor-pointer' onClick={handleDetail}>{username.slice(0, 1).toUpperCase()}</h2>
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
      {showProfile && userDetails && (
        <div className="fixed top-16 right-4 bg-white shadow-md rounded-md w-64 p-4 border border-gray-200 z-50">
          <img src={userDetails.image} />
          <p className="text-sm text-gray-600"><strong>Username:</strong> {userDetails.firstName} {userDetails.lastName}</p>
          <p className="text-sm text-gray-600"><strong>Email:</strong> {userDetails.email || "Not available"}</p>
          <p className="text-sm text-gray-600"><strong>Gender:</strong> {userDetails.gender}</p>
        </div>
      )}
    </>
  )
}
