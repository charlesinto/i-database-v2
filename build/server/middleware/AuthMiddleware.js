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
const Helper_1 = __importDefault(require("../services/Helper"));
class AuthMiddleWare {
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                if (!token)
                    return res.status(406).send({ message: "Authorization failed" });
                const user = yield Helper_1.default.decodeToken(token);
                req.user = user;
                next();
            }
            catch (error) {
                res.status(406).send({ message: "Authorization failed" });
            }
        });
    }
    static isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user)
                    return res.status(406).send({ message: "Authorization failed" });
                if (AuthMiddleWare.ADMIN_ROLES.includes(user.role)) {
                    return next();
                }
                return res.status(406).send({
                    message: "insufficient authorization please contact administrator",
                });
            }
            catch (error) {
                res.status(406).send({ message: "Authorization failed" });
            }
        });
    }
    static isSuperAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user)
                    return res.status(406).send({ message: "Authorization failed" });
                if (AuthMiddleWare.SUPER_ADMIN_ROLES.includes(user.role)) {
                    return next();
                }
                return res.status(406).send({
                    message: "insufficient authorization please contact administrator",
                });
            }
            catch (error) {
                res.status(406).send({ message: "Authorization failed" });
            }
        });
    }
    static verifyTokenByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.params.tokenId;
                if (!token) {
                    return res.status(406).send({ message: "Authorization failed" });
                }
                const user = yield Helper_1.default.decodeToken(token);
                req.user = user;
                next();
            }
            catch (error) {
                res.status(406).send({ message: "Authorization failed" });
            }
        });
    }
}
AuthMiddleWare.ADMIN_ROLES = ["SUPER ADMIN", "ADMIN"];
AuthMiddleWare.SUPER_ADMIN_ROLES = ["SUPER ADMIN"];
exports.default = AuthMiddleWare;
