// var couchbase = require('couchbase');
















const mongoose = require("mongoose");

const connectDB = async()=>{
   try{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.underline.bold);
   }catch(error){
    console.error(`Error: ${error} `)
    // process.exit(1) //passing 1 - will exit the proccess with error
}
};

module.exports= connectDB;









// ,{
//     useNewUrlParser:true,
//     // useCreateContext:true,
//     // useFindAndModify:false,
//     useUnifiedTopology:true,
// }