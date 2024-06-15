import express, { Request, Response } from "express";
import verifyToken from "../middlewares/auth";
import Flight from "../models/flight";
import { FlightType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = flights.map((flight) => {
      const userBookings = flight.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const flightWithUserBookings: FlightType = {
        ...flight.toObject(),
        bookings: userBookings,
      };

      return flightWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;