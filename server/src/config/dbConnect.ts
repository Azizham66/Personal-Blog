import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "blogDB"
        });
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;