import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: flights } = useQuery("fetchQuery", () =>
    apiClient.fetchFlights()
  );

  // Limit the number of hotels to 8
  const limitedFlights = flights?.slice(0, 8) || [];
  const topRowFlights = limitedFlights.slice(0, 2);
  const bottomRowFlights = limitedFlights.slice(2);

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowFlights.map((flight) => (
            <LatestDestinationCard key={flight._id} flight={flight} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowFlights.map((flight) => (
            <LatestDestinationCard key={flight._id} flight={flight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;