import React, { useContext, useState } from "react";

type SearchContext = {
  fromCity: string;
  toCity: string;
  departureDate: Date;
  adultCount: number;
  childCount: number;
  class: string;
  flightId: string;
  saveSearchValues: (
    fromCity: string,
    toCity: string,
    departureDate: Date,
    adultCount: number,
    childCount: number,
    className: string,
    flightId?: string
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [fromCity, setFromCity] = useState<string>(
    () => sessionStorage.getItem("fromCity") || ""
  );
  const [toCity, setToCity] = useState<string>(
    () => sessionStorage.getItem("toCity") || ""
  );
  const [departureDate, setDepartureDate] = useState<Date>(
    () => new Date(sessionStorage.getItem("departureDate") || new Date().toString())
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "1")
  );
  const [classType, setClassType] = useState<string>(
    () => sessionStorage.getItem("class") || ""
  );
  const [flightId, setFlightId] = useState<string>(
    () => sessionStorage.getItem("flightId") || ""
  );

  const saveSearchValues = (
    fromCity: string,
    toCity: string,
    departureDate: Date,
    adultCount: number,
    childCount: number,
    className: string,
    flightId?: string
  ) => {
    setFromCity(fromCity);
    setToCity(toCity);
    setDepartureDate(departureDate);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setClassType(className);
    if (flightId) {
      setFlightId(flightId);
    }

    sessionStorage.setItem("fromCity", fromCity);
    sessionStorage.setItem("toCity", toCity);
    sessionStorage.setItem("departureDate", departureDate.toString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("class", className);

    if (flightId) {
      sessionStorage.setItem("flightId", flightId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        fromCity,
        toCity,
        departureDate,
        adultCount,
        childCount,
        class: classType,
        flightId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};

  