import express from "express";
import notesRoutes from './routes/notesRoutes.js'
import {connectionDB} from './config/db.js'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port = process.env.PORT || 5002;
connectionDB();
app.use(express.json());
app.use('/api/notes',notesRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});