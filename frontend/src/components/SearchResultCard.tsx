import { Link } from "react-router-dom";
import { FlightType } from "../../../backend/src/shared/types";

type Props = {
    flight: FlightType;
};

function SearchResultCard({flight}: Props){
   return(
    <div
    className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 shadow-md"
  >
    <h2 className="text-2xl font-bold">{flight.name}</h2>
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
       <div className="w-full">
        <img
          src={flight.imageUrls[0]}
          alt={flight.name}
          className="w-full h-full object-cover object-center"
        />
       </div>
       <div className="grid grid-cols-1 gap-3">
        <div className="p-3 text-center text-orange-400">{flight.departureTime}</div>
        <div className="p-3 text-center font-bold">{flight.fromCity}</div>
       </div>
       <div className="grid grid-cols-1 gap-3">
        <div className="p-3 text-center">{flight.flightTime}</div>
        <hr />
        <div className="text-1xl p-3 text-center">To</div>
       </div>
       <div className="grid grid-cols-1 gap-3">
        <div className="p-3 text-center text-orange-400">{flight.arrivalTime}</div>
        <div className="p-3 text-center font-bold">{flight.toCity}</div>
       </div>
       <div className="flex flex-row lg:flex-col justify-center items-center gap-5">
            <Link
              to={`/detail/${flight._id}`}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-400"
            >
              Book
            </Link>
            <span className="font-bold">₹{flight.totalPrice}</span>
            {/* <Link to={`/detail/${flight._id}`} className="text-blue-600 hover:text-blue-800">
                Details
            </Link> */}
        </div>
     </div>
    </div>
   );
}

export default SearchResultCard;