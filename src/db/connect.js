import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error.message);
  }
};

export { connect };
