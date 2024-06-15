import { useQuery } from "react-query";
import * as apiClient from "../api-client";

function MyBookings() {
  const { data: flights } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!flights || flights.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {flights
        .filter((flight) => flight.bookings.length > 0) // Only consider flights with bookings
        .map((flight) => (
          <div key={flight._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
            <div className="lg:w-full lg:h-[250px]">
              <img
                src={flight.imageUrls[0]}
                className="w-full h-full object-cover object-center"
                alt={flight.name}
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {flight.name}
                <div className="text-xs font-normal">
                  {flight.fromCity} to {flight.toCity}
                </div>
                <div>
                  <span className="font-bold mr-2">Dates:</span>
                  <span>{new Date(flight.departureDate).toDateString()}</span>
                </div>
              </div>
              {flight.bookings.map((booking) => (
                <div key={booking._id}>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyBookings;


