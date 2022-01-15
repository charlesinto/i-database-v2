

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currentStateSchema = new mongoose.Schema(
  {
    recieved_messages: {
      type: Schema.Types.Array,
      required: true,
    },
    pair: {
      type: String,
    },
  },
  { timestamps: true }
);

const CurrentState = mongoose.model("current_state", currentStateSchema);

export { CurrentState };
