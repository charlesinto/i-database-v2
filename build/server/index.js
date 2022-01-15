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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("./logger/winston");
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const botRoute_1 = __importDefault(require("./routes/botRoute"));
let app = (0, express_1.default)();
mongoose_1.default.Promise = global.Promise;
app.use((0, cors_1.default)());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(Buffer.from(process.env.FRONT_APP_CLIENT_ID + ":" + process.env.FRONT_CLIENT_SECRET).toString("base64"));
        yield mongoose_1.default.connect(process.env.DATABASE_URL ? process.env.DATABASE_URL : "");
        console.log("MongoDB connected");
        app.use((0, express_session_1.default)({
            resave: false,
            secret: "secretkey",
            cookie: {},
            saveUninitialized: false,
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.use((0, connect_flash_1.default)());
        const port = process.env.PORT || 3002;
        app.use((0, morgan_1.default)("combined", { stream: winston_1.stream }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use('/api/v1/bot', botRoute_1.default);
        app.use(function (err, req, res, next) {
            winston_1.logger.error(err.response ? err.response.data : err.stack ? err.stack : err);
            res.status(err.response.status || 500).send({
                mesage: err.response ? err.response.data : err.stack ? err.stack : err,
                description: `Something broke!. Check application logs for helpful tips. OriginalUrl: ${req.originalUrl}  `,
            });
        });
        app.get("/", (req, res) => {
            return res.status(200).send({ message: "Welcome to i-Database 1.0" });
        });
        app.listen(port, () => {
            console.log(`Server is Listening at ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}))();
exports.default = app;
