import { Env } from "./env.config"
import mongoose from "mongoose"

const DatabaseConnection = async() => {
    try{
        mongoose.connect(Env.MONGO_URI)
        console.log(`database connected succesfully`)
    }
    catch(e){
        console.error(`error not connected ${e}`)
        process.exit(1)
    }
}

export default DatabaseConnection;