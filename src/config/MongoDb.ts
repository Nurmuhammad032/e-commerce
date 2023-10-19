import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING || "", {});
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log("Error is: ", error);
    process.exit(1);
  }
};

export default connectDatabase;
