const mongoose = require("mongoose")

exports.connectdb = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        if(!MONGO_URI) {
            return process.exit(1)
        }
        await mongoose.connect(MONGO_URI)
        console.log("connected to MONGO_URI :",MONGO_URI )
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
} 

