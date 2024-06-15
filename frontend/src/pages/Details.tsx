import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

function Details(){
     const { flightId } = useParams();
     const search = useSearchContext();

     const {data: flight} = useQuery(
        "fetchFlightById",
        ()=> apiClient.fetchFlightById(flightId || ""),
        {
            enabled: !!flightId,
        }
     );

     if(!flight){
        return <></>;
     }

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

    const datu = flight.departureDate.toString();
    const ndate = new Date(datu);
    const formattedDate = ndate.toLocaleDateString('en-GB');

    return(
        <div
        className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 shadow-md"
      >
        <h2 className="text-2xl font-bold">{flight.name}</h2>
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-4">
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
        </div>
        <p><b>Luggage</b> : Ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat pariatur quia perspiciatis blanditiis, repellendus qui facilis, architecto ipsum fugiat inventore, itaque alias! Eius suscipit optio eos ullam veritatis laboriosam tempore! Cum amet provident ipsum ab accusamus, debitis suscipit, aut facilis laboriosam veniam magnam maiores incidunt temporibus numquam aperiam ullam, porro tenetur voluptatibus officia laudantium.<br></br><b>Cabin</b> : Fuga rerum sunt nobis eos ut ipsam cupiditate deleniti minima quo doloremque odit totam, ipsa aut, unde numquam. Accusantium soluta accusamus a at fugit iure, fuga nobis quis eos odit quod possimus pariatur nulla! Laboriosam iusto, quasi aspernatur explicabo vitae veritatis deserunt. Error commodi quisquam, cum excepturi voluptas quod sapiente reiciendis, ad iure obcaecati alias rem et atque, quae possimus non porro?</p>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <ul className=" text-amber-600">
                <li>Adults : {search.adultCount}</li>
                <li>Children : {search.childCount}</li>
                <li>Adult Price : {adultPrice}</li>
                <li>Child Price : {childPrice}</li>
                <li>Class : {flight.class}</li>
                <li>Date : {formattedDate}</li>
            </ul>
            <GuestInfoForm totalPrice={flight.totalPrice}
            flightId={flight._id}
            aduCount={flight.adultCount}
            chilCount={flight.childCount}/>
        </div>
       </div> 
    );
};

export default Details;