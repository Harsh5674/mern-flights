import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

function Booking(){
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { flightId } = useParams();

    const [finalPrice,setFinalPrice] = useState<number>(0);

    const { data: flight } = useQuery(
        "fetchHotelByID",
        () => apiClient.fetchFlightById(flightId as string),
        {
          enabled: !!flightId,
        }
      );

    const { data: currentUser } = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
     );

    

     const adulPrice =
        flight?.class.toLowerCase() === "economy"
        ? flight.economyAdultPrice
        : flight?.class.toLowerCase() === "business"
        ? flight.businessAdultPrice
        : 0;

    const chiPrice =
        flight?.class.toLowerCase() === "economy"
        ? flight.economyChildPrice
        : flight?.class.toLowerCase() === "business"
        ? flight.businessChildPrice
        : 0;


    useEffect(() => {
        if (search.adultCount || search.childCount) {
          const prices =
            (search.adultCount*adulPrice)+(search.childCount*chiPrice);
    
          setFinalPrice(prices);
        }
      }, [search.adultCount, search.childCount]);

    const { data: paymentIntentData } = useQuery(
      "createPaymentIntent",
      () =>
        apiClient.createPaymentIntent(
          flightId as string,
          finalPrice.toString()
        ),
      {
        enabled: !!flightId && finalPrice > 0,
      }
    );


    if(!flight){
      return <p>Error is Here</p>;
   }

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary 
              fromCity={flight.fromCity}
              toCity={flight.toCity}
              departureTime={flight.departureTime}
              arrivalTime={flight.arrivalTime}
              flightTime={flight.flightTime}
              adultCount={search.adultCount}
              childCount={search.childCount}
              finalPrice={finalPrice}
            />
            {currentUser && paymentIntentData && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntentData.clientSecret,
              }}
            >
              <BookingForm
                currentUser={currentUser}
                paymentIntent={paymentIntentData}
              />
            </Elements>
      )}
        </div>
    );
}

export default Booking;