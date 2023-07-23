import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.MONGODB_DB,
    });

    const readyState = db.connections[0].readyState;
    isConnected = readyState === 1;
    console.log("=> MongoDB connection success");
  } catch (error) {
    console.log("=> MongoDB connection error: ", error);
  }
};
