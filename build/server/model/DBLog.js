"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const dbLogSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const DbLog = mongoose_1.default.model("db_logs", dbLogSchema);
exports.DbLog = DbLog;
