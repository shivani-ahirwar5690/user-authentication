import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
       default:false
    },
    verificationToken: {
        type: String
    }
},
 {
        timestamps: true
    })

export const UserModel = mongoose.model('user',userSchema);
