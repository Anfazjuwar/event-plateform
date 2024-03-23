import mongoose from "mongoose";

///manage databse connection

const MongoDB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MongoDB_URI) {
    throw new Error("No Mongo DB URI provided");
  }
  cached.promise =
    cached.promise ||
    mongoose.connect(MongoDB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};

//Server actions
//connectiondatabase()
