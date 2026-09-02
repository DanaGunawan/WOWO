import mongoose, {Schema,Document} from 'mongoose'
import { hashValue,compareValue } from '../utils/bcrypt'

export interface userDocument extends Document {
    name: string,
    email: string,
    password: string,
    avatar?: string | null,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema<userDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true },
        avatar: { type: String }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                if (ret) {
                    delete (ret as any).password
                }
                return ret
            }
        }
    }
)

UserSchema.methods.comparePassword = async function (val:string){
    return await compareValue(val, this.password)
}

UserSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await hashValue(this.password)
    }
    next()
})

const userModel = mongoose.model<userDocument>('User',UserSchema);
export default userModel;
