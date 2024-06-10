import express,{Request,Response} from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => {
    console.log("Connected to Database!");
  })
.catch(() => {
   console.log("Connection to Database failed!");
  });

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

app.get("/test", async (req:Request,res:Response) => {
       //res.json({message: " Working!"});
       res.send("<h1>Working</h1>");
});



app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});