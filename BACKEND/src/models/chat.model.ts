import mongoose,{Document, Schema} from 'mongoose'


export interface chatDocument extends Document{
    participants: mongoose.Types.ObjectId[],
    lastMessage: mongoose.Types.ObjectId,
    isGroup:boolean,
    groupName: string,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}



const chatSchema = new Schema<chatDocument>({
    participants:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true,
    }],
    lastMessage:[{
        type:mongoose.Types.ObjectId,
        ref: "Message",
        default: null
    }],
    isGroup:[{
        type: Boolean,
        default:false
    }],
    createdBy: [{
        type:mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }]
},{
    timestamps:true
})

const chatModel = mongoose.model<chatDocument>('chat',chatSchema);
export default chatModel;