import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectionDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from './middleware/rateLimiter.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5002;


app.use(express.json());
app.use(ratelimiter); 
app.use("/api/notes", notesRoutes);


connectionDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
