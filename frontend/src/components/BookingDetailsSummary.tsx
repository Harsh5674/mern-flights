//import { FlightType } from "../../../backend/src/shared/types";

type Props = {
    fromCity:string;
    toCity:string;
    departureTime:string;
    arrivalTime:string;
    flightTime:string;
    adultCount: number;
    childCount: number;
    finalPrice:number;
    //flight: FlightType;
  };

  const BookingDetailsSummary = ({
    fromCity,
    toCity,
    departureTime,
    arrivalTime,
    flightTime,
    adultCount,
    childCount,
    finalPrice,
    //flight,

  }: Props) => {
    return (
      <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">Your Booking Details</h2>
        <div className="flex justify-between">
          <div>
            From-City
            <div className="font-bold"> {fromCity}</div>
          </div>
          <div>
            To-City
            <div className="font-bold"> {toCity}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            Departure-Time
            <div className="font-bold"> {departureTime}</div>
          </div>
          <div>
            Arrival-Time
            <div className="font-bold"> {arrivalTime}</div>
          </div>
        </div>
        <div className="border-t border-b py-2">
          Total length of Flight:
          <div className="font-bold">{flightTime}</div>
        </div>
  
        <div>
          Guests{" "}
          <div className="font-bold">
            {adultCount} adults & {childCount} children
          </div>
        </div>
        <div className="border-t border-b py-2">
          Final-Price:
          <div className="font-bold">{finalPrice}</div>
        </div>
      </div>
    );
  };
  
  export default BookingDetailsSummary;