import mongoose from 'mongoose'

 const connectDb = async()=>{
    try {
        let res = await mongoose.connect("mongodb://127.0.0.1:27017/user-authentication")
        if(res)
        {
            console.log("mongodb connected");
        }
    } catch (error) {
      console.log("errro in connection of mongodb",error);
    }
}

export default connectDb
