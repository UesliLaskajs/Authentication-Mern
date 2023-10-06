const mongoose=require("mongoose")
require("dotenv").config();
const {Mongo_Url,Port}=process.env;

mongoose.connect(Mongo_Url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log(`Connected to MongoDb at ${Mongo_Url}`);
})
.catch((err)=>{
    console.log(`Error`,err)
})


