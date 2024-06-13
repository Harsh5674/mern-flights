import express,{Request,Response} from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import myFlightRoutes from "./routes/my-flights";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => {
    console.log("Connected to Database!");
  })
.catch(() => {
   console.log("Connection to Database failed!");
  });

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-flights",myFlightRoutes);

app.get("/test", async (req:Request,res:Response) => {
       //res.json({message: " Working!"});
       res.send("<h1>Working</h1>");
});



app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});