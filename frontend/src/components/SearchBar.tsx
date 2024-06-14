import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { BiCalendarStar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function SearchBar(){
    const navigate = useNavigate();
    const search = useSearchContext();

    const [fromCity, setFromCity] = useState<string>(search.fromCity);
    const [toCity, setToCity] = useState<string>(search.toCity);
    const [departureDate, setDepartureDate] = useState<Date>(search.departureDate);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);
    const [classType,setClassType] = useState<string>(search.class);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
          fromCity,
          toCity,
          departureDate,
          adultCount,
          childCount,
          classType
        );
        navigate("/search");
      };
    
      return (
        <form
          onSubmit={handleSubmit}
          className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 items-center gap-4"
        >
          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="From"
              className="text-md w-full focus:outline-none"
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            />
          </div>

          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="To"
              className="text-md w-full focus:outline-none"
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            />
          </div>
    
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={5}
                value={adultCount}
                onChange={(event) => setAdultCount(parseInt(event.target.value))}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={3}
                value={childCount}
                onChange={(event) => setChildCount(parseInt(event.target.value))}
              />
            </label>
          </div>
          <div className="flex flex-row items-center flex-1 bg-white p-2">
                <BiCalendarStar size={25} className="mr-2" />
                <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date as Date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Departure Date"
                className="text-md w-full focus:outline-none"
                />
          </div>
          <div className="flex flex-row items-center flex-1 bg-white p-2">
                <select
                className="text-md w-full focus:outline-none"
                value={classType}
                onChange={(event) => setClassType(event.target.value)}
                >
                <option value="" disabled>Class</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                </select>
          </div>
          <div className="flex gap-1">
            <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
              Search
            </button>
            <button
            onClick={() => {
                setFromCity("");
                setToCity("");
                //setDepartureDate();
                setAdultCount(1);
                setChildCount(0);
                setClassType("");
              }} 
            className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
              Clear
            </button>
          </div>
        </form>
      );
}

export default SearchBar;