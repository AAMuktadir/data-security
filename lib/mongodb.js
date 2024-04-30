import mongoose from "mongoose";

const connect = async () => {
  //   pass: i70aR1t8EVYDCoST;
  //   user: muktadirplanetx;
  try {
    await mongoose.connect(
      "mongodb+srv://muktadirplanetx:i70aR1t8EVYDCoST@encrypted-data.w2oyerd.mongodb.net/?retryWrites=true&w=majority&appName=encrypted-data"
    );
    console.log("MongoDB connection successful");
  } catch (error) {
    throw new Error("Error in connecting to mongobd");
  }
};

export default connect;
