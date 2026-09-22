import { Env } from "./env.config";
import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
    cloud_name : Env.CLOUDINARY_NAME,
    api_key : Env.CLOUDINARY_API_KEY,
    api_secret : Env.CLOUDINARY_API_SECRET
})


export default cloudinary;