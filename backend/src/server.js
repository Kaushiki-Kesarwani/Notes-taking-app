import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectionDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from './middleware/rateLimiter.js'
import authRoutes from "./routes/auth.route.js"
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));
app.use(express.json());
app.use(ratelimiter); 

app.use("/api/auth",authRoutes);
app.use("/api/notes", notesRoutes);


connectionDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
