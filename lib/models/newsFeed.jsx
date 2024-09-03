import mongoose from "mongoose";

const { Schema } = mongoose;

const newsFeedSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },

    author_id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    comments: [
      {
        writer: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.newsFeed ||
  mongoose.model("newsFeed", newsFeedSchema);
