import mongoose from "mongoose";

const Schema = mongoose.Schema;

const settingSchema = new mongoose.Schema(
  {
    email_token: {
      type: String,
      required: true,
    },
    bot_id: {
      type: Schema.Types.Number,
    },
    webhook: {
      type: String,
    },
    amount: {
      type: Schema.Types.Number,
    },
    action_value: {
      type: Schema.Types.Number,
    },
    auto_action: {
      type: Schema.Types.Boolean,
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("configuration", settingSchema);

export { Setting };
