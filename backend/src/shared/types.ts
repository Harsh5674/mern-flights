export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type FlightType = {
  _id: string;
  userId: string;
  name: string;
  fromCity: string;
  toCity: string;
  adultCount: number;
  childCount: number;
  class:string;
  economyAdultPrice: number;
  economyChildPrice: number;
  businessChildPrice: number;
  businessAdultPrice: number;
  totalPrice: number;
  departureDate:Date;
  departureTime:string;
  arrivalTime:string;
  flightTime:string;
  imageUrls: string[];
  lastUpdated: Date;
  //bookings: BookingType[];
};

export type FlightSearchResponse = {
  data: FlightType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};