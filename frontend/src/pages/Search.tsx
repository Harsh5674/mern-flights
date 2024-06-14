import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import FlightNamesFilter from "../components/FlightNamesFilter";
import PriceFilter from "../components/PriceFilter";


const Search = () => {
    const search = useSearchContext();
    console.log(search);
    const [page, setPage] = useState<number>(1);
    const [selectedFlightNames, setSelectedFlightNames] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        fromCity: search.fromCity,
        toCity: search.toCity,
        class:search.class,
        departureDate: search.departureDate.toString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        name: selectedFlightNames,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    const { data: flightData } = useQuery(["searchFlights", searchParams], () =>
    apiClient.searchFlights(searchParams)
    );

    const handleFlightNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const flightName = event.target.value;
    
        setSelectedFlightNames((prevFlightNames) =>
          event.target.checked
            ? [...prevFlightNames, flightName]
            : prevFlightNames.filter((flight) => flight !== flightName)
        );
      };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
          <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
             <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter by:
                </h3>
                <FlightNamesFilter
                    selectedFlightNames={selectedFlightNames}
                    onChange={handleFlightNameChange}
                />
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?: number) => setSelectedPrice(value)}
                />
             </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">
                {flightData?.pagination.total || 0} Flights found
                {search.fromCity ? ` for ${search.fromCity} to ` : ""}
                {search.toCity ? `${search.toCity}` : ""}
              </span> 
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="p-2 border rounded-md"
                >
                <option value="">Sort By</option>
                <option value="totalPriceAsc">
                Adult Price (low to high)
                </option>
                <option value="totalPriceDesc">
                Adult Price (high to low)
                </option>
                <option value="flightTime">
                Flight Time
                </option>
                <option value="departureTime">
                Departure Time
                </option>
            </select>
            </div>
            {flightData?.data.map((flight) => (
                <SearchResultCard flight={flight} />
            ))}
            <div>
                <Pagination 
                  page={flightData?.pagination.page || 1}
                  pages={flightData?.pagination.pages || 1}
                  onPageChange={(page) => setPage(page)}
                />
            </div>
          </div>
        </div>
    );
};

export default Search;