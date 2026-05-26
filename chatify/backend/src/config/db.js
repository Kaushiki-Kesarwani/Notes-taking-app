import mongoose from 'mongoose'

export const conn = async()=>{
    const db = await mongoose.connect(process.env.MONGODB_URI);

    try{
        console.log(`MongoDB connected:${db.connection.host}`);
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

