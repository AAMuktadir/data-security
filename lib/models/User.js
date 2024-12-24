import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    university: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    studentID: {
      type: String,
      required: true,
      unique: true,
    },

    bio: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", userSchema);
