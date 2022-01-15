"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const settingSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Setting = mongoose_1.default.model("configuration", settingSchema);
exports.Setting = Setting;
