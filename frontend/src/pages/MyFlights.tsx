//import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsCalendarDate } from "react-icons/bs";
import { BiMoney, BiHotel, BiCalendarStar } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";

const MyFlights = () => {
  const { data: flightData } = useQuery(
    "fetchMyFlights",
    apiClient.fetchMyFlights,
    {
      onError: () => {},
    }
  );

  const { isLoggedIn, userEmail } = useAppContext();

  console.log("Is Logged In:", isLoggedIn);
  console.log("User Email:", userEmail);

  if (!flightData) {
    return <span>No Flights found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Flights</h1>
        {isLoggedIn && userEmail === "a2a2a@gmail.com" && (
          <Link
            to="/add-flight"
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          >
            Add Flight
          </Link>
        )}
      </span>

      <div className="grid grid-cols-1 gap-8">
        {flightData.map((flight) => {
          // Determine prices based on flight class
          const adultPrice =
            flight.class.toLowerCase() === "economy"
            ? flight.economyAdultPrice
            : flight.class.toLowerCase() === "business"
            ? flight.businessAdultPrice
            : 0;

          const childPrice =
            flight.class.toLowerCase() === "economy"
            ? flight.economyChildPrice
            : flight.class.toLowerCase() === "business"
            ? flight.businessChildPrice
            : 0;


            const departureDate = new Date(flight.departureDate);
            const formattedDate = departureDate.toLocaleDateString();  

          return (
            <div
              key={flight._id}
              data-testid="flight-card"
              style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)' }}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{flight.name}</h2>
              <div className="grid grid-cols-4 gap-5">
                <div className="w-full">
                  <img
                    src={flight.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 text-center text-blue-500">{flight.departureTime}</div>
                  <div className="p-3 text-center font-bold">{flight.fromCity}</div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 text-center">{flight.flightTime}</div>
                  <hr />
                  <div className="text-1xl p-3 text-center">To</div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 text-center text-blue-500">{flight.arrivalTime}</div>
                  <div className="p-3 text-center font-bold">{flight.toCity}</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />₹{adultPrice} Adult Price
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {flight.adultCount} adults <br />{flight.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />₹{childPrice} Child Price
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiCalendarStar className="mr-1" />{flight.class}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsCalendarDate className="mr-1" />{formattedDate}
                </div>
              </div>
              <span className="flex justify-end space-x-4">
                {isLoggedIn && userEmail === "a2a2a@gmail.com" && (
                    <Link
                        to={`/edit-flight/${flight._id}`}
                        className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                        >
                        Edit Flight
                        </Link>
                        )}
                    <Link
                        to={`/detail/${flight._id}`}
                        className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                    >
                        View Details
                    </Link>
             </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFlights;
