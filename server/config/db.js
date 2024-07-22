const mongoose= require('mongoose')
const connectdb= async()=>{
    try {
        mongoose.set('strictQuery',false)
        const conn =await mongoose.connect(process.env.MONGODB_URL)
        console.log(`data base has been connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports =connectdb;