"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentState = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const currentStateSchema = new mongoose_1.default.Schema({
    recieved_messages: {
        type: Schema.Types.Array,
        required: true,
    },
    pair: {
        type: String,
    },
}, { timestamps: true });
const CurrentState = mongoose_1.default.model("current_state", currentStateSchema);
exports.CurrentState = CurrentState;
