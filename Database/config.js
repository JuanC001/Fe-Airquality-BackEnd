import mongoose from "mongoose";

const dbConnection = async () => {

    try {

        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});

        console.log("Connected to Mongoose")

    } catch (error) {

        console.log("Failed to connect to Mongoose")
        throw new Error('Error al inicializar DB')

    }

}

export default dbConnection;