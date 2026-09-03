import mongoose, {Document,Schema} from 'mongoose'

export interface messageDocument extends Document{
    chatId: mongoose.Types.ObjectId,
    sender: mongoose.Types.ObjectId,
    image: string,
    content: string,
    replyTo: mongoose.Types.ObjectId,

    createdAt: Date,
    updatedAt: Date
}

const messageSchema = new Schema<messageDocument>({
    chatId: {
        type:Schema.Types.ObjectId,
        ref: "chat",
        required: true
    },
    sender: {
        type:Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: {type:String},
    content:{type:String},
    replyTo:{Type:Schema.Types.ObjectId,ref:'user',default:null}
})


const messageModel = mongoose.model<messageDocument>('message',messageSchema)
export default messageModel;