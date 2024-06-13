import mongoose from "mongoose";
import { FlightType } from "../shared/types";

const flightSchema = new mongoose.Schema<FlightType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    adultCount: { type: Number, required: true,min: 1, max: 5},
    childCount: { type: Number, required: true,min: 0, max: 3},
    class: { type: String, required: true },
    economyAdultPrice: { type: Number, required: true },
    economyChildPrice: { type: Number, required: true },
    businessChildPrice: { type: Number, required: true },
    businessAdultPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: {type: String, required: true},
    flightTime: {type: String, required: true},
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    //bookings: [bookingSchema],
});

const Flight = mongoose.model<FlightType>("Flight", flightSchema);
export default Flight;