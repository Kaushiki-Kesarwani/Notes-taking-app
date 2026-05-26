import express from 'express'
import dotenv from 'dotenv'
import {conn} from './config/db.js'
import authroutes from './routes/authRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth',authroutes);
    
const port = process.env.PORT || 5001
conn();
app.listen(port,()=>{
    console.log(`app is listening at ${port} port`)
})
