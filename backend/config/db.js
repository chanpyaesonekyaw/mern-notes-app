import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Cache the connection to reuse it across function invocations
let cachedConnection = null;

export const connectDB = async () => {
    // If we already have a connection, return it
    if (cachedConnection) {
        return cachedConnection;
    }
    
    try {
        // Set connection options for better performance in serverless environments
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Limit the number of connections in the pool
        };
        
        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Cache the connection
        cachedConnection = conn;
        
        // Handle connection errors
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            cachedConnection = null; // Reset cached connection on error
        });
        
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        cachedConnection = null; // Reset cached connection on error
        
        // In production, don't exit the process, just log the error
        if (process.env.NODE_ENV === 'production') {
            console.error('Failed to connect to MongoDB, but continuing in production mode');
            return null;
        } else {
            process.exit(1);
        }
    }
}