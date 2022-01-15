"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class App {
    static assignToken(payload, expiresTime) {
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || "charlesisawseosome", {
            expiresIn: expiresTime ? expiresTime : "2h",
        });
        return token;
    }
    static decodeToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "shsujnudnd");
                resolve(decoded);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static checkExpirationTime(expirationTime) {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        const currentTime = new Date(Date.now() - tzoffset).toISOString();
        try {
            if (new Date(currentTime).getTime() >= new Date(expirationTime).getTime())
                return true;
            return false;
        }
        catch (er) {
            throw new Error(er);
        }
    }
    static discount(percentageDiscount, totalPrice) {
        try {
            return percentageDiscount * totalPrice * 0.01;
        }
        catch (er) {
            throw new Error(er);
        }
    }
    static sendAction(url, payload) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(url, payload);
                resolve(response.data);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = App;
