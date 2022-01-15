"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const app_root_path_1 = __importDefault(require("app-root-path"));
const winston_1 = __importDefault(require("winston"));
// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: "info",
        filename: `${app_root_path_1.default}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 10,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
// instantiate a new Winston Logger with the settings defined above
exports.logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
class MyStream {
    write(text) {
        exports.logger.info(text);
    }
}
exports.stream = new MyStream();
// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write: function (message: any, encoding: any) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     logger.info(message);
//   },
// };
