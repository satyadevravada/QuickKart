import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedID = localStorage.getItem("userId");
    if (storedID && storedID !== "undefined") {
      try {
        setUser(storedID);
        console.log(storedID);
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);
  console.log(user);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="w-44 h-14 overflow-hidden flex items-center justify-start">
        <a href="/">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain"
          />
        </a>
      </div>

      <div className="flex w-[800px] rounded-md">
        <SearchBar />
      </div>

      <nav className="flex items-center space-x-4">
        <a
          href="/cart"
          className="text-gray-800 hover:text-green-600 text-lg font-bold px-3 transition-colors duration-200"
        >
          🛒 Cart
        </a>

        {user ? (
          <div className="relative inline-block">
            <div className="group">
              <div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center bg-gray-100 text-green-600 cursor-pointer">
                👤
              </div>

              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <a
                  href="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600"
                >
                  My Orders
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");

                    window.location.href = "/signin";
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <a
            href="/signin"
            className="ml-2 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors duration-200 font-semibold"
          >
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
}

export default Header;
