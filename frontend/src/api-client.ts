import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import{ FlightSearchResponse, FlightType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    return response.json();
  };

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  };

  export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const validateToken = async (): Promise<{ userId: string; email: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };

  export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };

  export const addMyFlight = async (flightFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-flights`, {
      method: "POST",
      credentials: "include",
      body: flightFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add flight");
    }
  
    return response.json();
  };

  export const fetchMyFlights = async (): Promise<FlightType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-flights`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };

  export const fetchMyFlightById = async (flightId: string): Promise<FlightType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-flights/${flightId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Flights");
    }
  
    return response.json();
  };

  export const updateMyFlightById = async (flightFormData: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/my-flights/${flightFormData.get("flightId")}`,
      {
        method: "PUT",
        body: flightFormData,
        credentials: "include",
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to update Flight");
    }
  
    return response.json();
  };

  export type SearchParams = {
    fromCity?: string;
    toCity?: string;
    departureDate?: string;
    class?:string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    name?: string[];
    maxPrice?: string;
    sortOption?: string;
  };

  export const searchFlights = async (
    searchParams: SearchParams
  ): Promise<FlightSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("fromCity", searchParams.fromCity || "");
    queryParams.append("toCity", searchParams.toCity || "");
    queryParams.append("class", searchParams.class || "");
    queryParams.append("departureDate", searchParams.departureDate || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
  
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.name?.forEach((nam) =>
      queryParams.append("name", nam)
    );
  
    const response = await fetch(
      `${API_BASE_URL}/api/flights/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching flights");
    }
  
    return response.json();
  };

  export const fetchFlights = async (): Promise<FlightType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/flights`);
    if (!response.ok) {
      throw new Error("Error fetching flights");
    }
    return response.json();
  };

  export const fetchFlightById = async (flightId: string): Promise<FlightType> => {
    const response = await fetch(`${API_BASE_URL}/api/flights/${flightId}`);
    if (!response.ok) {
      throw new Error("Error fetching Flights");
    }
  
    return response.json();
  };

  export const createPaymentIntent = async (
    flightId: string,
    finalPrice: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/flights/${flightId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ finalPrice }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };

  export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/flights/${formData.flightId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };

  export const fetchMyBookings = async (): Promise<FlightType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };
  