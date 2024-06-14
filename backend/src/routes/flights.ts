import express,{Request,Response} from "express";
import Flight from "../models/flight";
import { FlightSearchResponse } from "../shared/types";

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