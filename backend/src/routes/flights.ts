import express,{Request,Response} from "express";
import Flight from "../models/flight";
import { BookingType, FlightSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middlewares/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req:Request,res:Response) => {
    try{
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "totalPriceAsc":
                sortOptions = { totalPrice: 1 };
                break;
            case "totalPriceDesc":
                sortOptions = { totalPrice: -1 };
                break;
            case "flightTime":
                sortOptions = { flightTime: 1};
                break;
            case "departureTime":
                sortOptions = { departureTime: 1};
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;

        const flights = await Flight.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        
        const total = await Flight.countDocuments(query);

        const response: FlightSearchResponse = {
            data: flights,
            pagination: {
              total,
              page: pageNumber,
              pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);

    }
    catch(error){
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong in flights.ts route" });
    }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find().sort("-lastUpdated");
    res.json(flights);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching flights" });
  }
});

router.get(
    "/:id",
    [param("id").notEmpty().withMessage("Flight ID is required")],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const id = req.params.id.toString();
  
      try {
        const flight = await Flight.findById(id);
        res.json(flight);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching flight" });
      }
    }
  );

  router.post(
    "/:flightId/bookings/payment-intent",
    verifyToken,
    async (req: Request, res: Response) => {
      const { finalPrice } = req.body;
      const flightId = req.params.flightId;
  
      const flight = await Flight.findById(flightId);
      if (!flight) {
        return res.status(400).json({ message: "Flight not found" });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalPrice * 100,
        currency: "INR",
        metadata: {
          flightId,
          userId: req.userId,
        },
      });
  
      if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: "Error creating payment intent" });
      }
  
      const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        finalPrice,
      };
  
      res.send(response);
    }
  );

  router.post(
    "/:flightId/bookings",
    verifyToken,
    async (req: Request, res: Response) => {
      try {
        const paymentIntentId = req.body.paymentIntentId;
  
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId as string
        );
  
        if (!paymentIntent) {
          return res.status(400).json({ message: "payment intent not found" });
        }
  
        if (
          paymentIntent.metadata.flightId !== req.params.flightId ||
          paymentIntent.metadata.userId !== req.userId
        ) {
          return res.status(400).json({ message: "payment intent mismatch" });
        }
  
        if (paymentIntent.status !== "succeeded") {
          return res.status(400).json({
            message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
          });
        }
  
        const newBooking: BookingType = {
          ...req.body,
          userId: req.userId,
        };
  
        const flight = await Flight.findOneAndUpdate(
          { _id: req.params.flightId },
          {
            $push: { bookings: newBooking },
          }
        );
  
        if (!flight) {
          return res.status(400).json({ message: "flight not found" });
        }
  
        await flight.save();
        res.status(200).send();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong bc mc" });
      }
    }
  );
  

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.fromCity) {
        constructedQuery.fromCity = new RegExp(queryParams.fromCity, "i");
    }

    if (queryParams.toCity) {
        constructedQuery.toCity = new RegExp(queryParams.toCity, "i");
    }
    
    if (queryParams.class) {
        constructedQuery.class = new RegExp(queryParams.class, "i");
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }  
  
    if (queryParams.name) {
      constructedQuery.name = {
        $in: Array.isArray(queryParams.name)
          ? queryParams.name
          : [queryParams.name],
      };
    }
    
  
    if (queryParams.maxPrice) {
      constructedQuery.totalPrice = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };

export default router;