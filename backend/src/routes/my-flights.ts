import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { FlightType } from "../shared/types";
import Flight from "../models/flight";
import verifyToken from "../middlewares/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });

 //  api/my-flights  and then below 
router.post("/", 
    verifyToken, [
        body("name").notEmpty().withMessage("Name is required"),
        body("fromCity").notEmpty().withMessage("fromCity is required"),
        body("toCity").notEmpty().withMessage("toCity is required"),
        body("economyAdultPrice")
          .notEmpty()
          .isNumeric()
          .withMessage("Price is required and must be a number"),
        body("economyChildPrice")
          .notEmpty()
          .isNumeric()
          .withMessage("Price is required and must be a number"),
        body("businessAdultPrice")
          .notEmpty()
          .isNumeric()
          .withMessage("Price is required and must be a number"),
        body("businessChildPrice")
          .notEmpty()
          .isNumeric()
          .withMessage("Price is required and must be a number"),
        body("totlaPrice")
          .notEmpty()
          .isNumeric()
          .withMessage("Price is required and must be a number"),
        body("class").notEmpty().withMessage("Class is required"),
        body("departureTime").notEmpty().withMessage("departureTime is required"),
        body("arrivalTime").notEmpty().withMessage("arrivalTime is required"),
        body("flightTime").notEmpty().withMessage("flightTime is required"),
        body("departureDate").notEmpty().withMessage("departureDate is required"),
    ],
    upload.array("imageFiles", 3), 
    async (req:Request,res:Response) => {
       try{
        const imageFiles = req.files as Express.Multer.File[];
        const newFlight: FlightType = req.body;
        
        const imageUrls = await uploadImages(imageFiles);

        newFlight.imageUrls = imageUrls;
        newFlight.lastUpdated = new Date();
        newFlight.userId = req.userId;

        const flight = new Flight(newFlight);
        await flight.save();

        res.status(201).send(flight);

       }
       catch(e){
        console.log(e);
        res.status(500).json({ message: "Error in creting new flight" });
       }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
      const flights = await Flight.find();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: "Error fetching flights" });
    }
  });

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
  
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;