"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Robot_1 = __importDefault(require("../controller/Robot"));
const ErrorHandler_1 = require("../middleware/ErrorHandler");
const router = express_1.default.Router();
router.post('/send-message', (0, ErrorHandler_1.handleErrorAsync)(Robot_1.default.handleOnPost));
router.post('/receive-messae', (req, res) => {
    console.log('payload gooten: ', req.body);
    res.status(200).send({ message: 'Ok' });
});
exports.default = router;
