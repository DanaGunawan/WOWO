import bcrypt from "bcrypt";

export const hashValue = async (value:string, salt = 10) => bcrypt.hash(value, salt);
export const compareValue = async (value:string, hash:string) => bcrypt.compare(value, hash);
