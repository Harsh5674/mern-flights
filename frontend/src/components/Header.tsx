import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";


function Header(){
    const { isLoggedIn } = useAppContext();

      return(
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto grid grid-cols-1 gap-4 sm:flex sm:flex-row sm:justify-between">
            <span className="text-3xl text-orange-400 font-bold tracking-tight flex justify-center sm:justify-start">
              <Link to="/" className="sm:inline-block">
                MernAir.com
              </Link>
            </span>
            <span className="flex justify-center space-x-2 sm:flex sm:space-x-2">
            {isLoggedIn ? (
              <>
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                  to="/my-flights"
                >
                  My Flights
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
      </div>
      );
};

export default Header;