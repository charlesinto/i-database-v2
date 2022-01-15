import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dbLogSchema = new mongoose.Schema(
  {
    pair: {
      type: String,
      required: true,
    },
    message_type: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    }
  },
  { timestamps: true }
);

const DbLog = mongoose.model("db_logs", dbLogSchema);

export { DbLog };
