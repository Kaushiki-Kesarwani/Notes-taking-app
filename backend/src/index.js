import express from 'express'
import dotenv from 'dotenv'
import {conn} from './config/db.js'
import cookieParser from 'cookie-parser'
import authroutes from './routes/authRoute.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authroutes);
    
const port = process.env.PORT || 5001
conn();
app.listen(port,()=>{
    console.log(`app is listening at ${port} port`)
})
