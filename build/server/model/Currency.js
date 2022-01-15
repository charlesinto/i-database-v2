"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const currencySchema = new mongoose_1.default.Schema({
    pair: {
        type: String,
        required: true,
    },
    value: {
        type: Schema.Types.Number,
    },
}, { timestamps: true });
const Currency = mongoose_1.default.model("currency", currencySchema);
exports.Currency = Currency;
