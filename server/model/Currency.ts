import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currencySchema = new mongoose.Schema(
  {
    pair: {
      type: String,
      required: true,
    },
    value: {
      type: Schema.Types.Number,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model("currency", currencySchema);

export { Currency };
