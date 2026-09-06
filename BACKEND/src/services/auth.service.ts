import userModel from "../models/user.model";
import { notFound, unauthorized } from "../utils/error-app";
import { loginSchemaType, registerSchemaType } from "../validators/auth.validator";

export const registerService = async (body: registerSchemaType) => {
  const { email } = body;
  const existingUser = userModel.findOne({ email });
  if (!existingUser)
    throw new unauthorized("user with this email not exist");
  const newUser = new userModel({
    ...body,
  });
  await newUser.save();
  return newUser;
};


export const loginService = async(body:loginSchemaType) => {
    const {email, password} = body

    const user = await userModel.findOne({email});
    if(!user) throw new notFound('email or password notfound')
    
    const validPassword = await user.comparePassword(password);
    if(!validPassword) throw new unauthorized('email or password invalid')
    return user;

    
}