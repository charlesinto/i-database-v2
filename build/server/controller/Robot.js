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
const constants_1 = require("../constants");
const Currency_1 = require("../model/Currency");
const CurrentState_1 = require("../model/CurrentState");
const DBLog_1 = require("../model/DBLog");
const Setting_1 = require("../model/Setting");
const Helper_1 = __importDefault(require("../services/Helper"));
class Robot {
    static resetStage(pair) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let totalAmountToDeduct = 0;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair });
                const currency = yield Currency_1.Currency.findOne({ pair });
                const newState = [];
                for (let i = 0; i < currentState.recieved_messages.length; i++) {
                    const item = currentState.recieved_messages[i];
                    if (item.message_type === constants_1.Message_Type.STEP_1_UP || item.message_type === constants_1.Message_Type.STEP_4_UP) {
                        newState.push({ message_type: item.message_type, value: item.value });
                    }
                    else {
                        totalAmountToDeduct = totalAmountToDeduct + item.value;
                    }
                }
                yield CurrentState_1.CurrentState.updateOne({ pair }, { recieved_messages: [...newState] });
                yield Currency_1.Currency.updateOne({ pair }, { value: currency.value - totalAmountToDeduct });
                resolve(1);
            }
            catch (error) {
                console.log('error: ', error);
                reject(error);
            }
        }));
    }
    static step1UpHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    yield CurrentState_1.CurrentState.create({
                        recieved_messages: [{ message_type: payload.message_type, value: payload.rating }],
                        pair: payload.pair,
                    });
                    if (!currency) {
                        yield Currency_1.Currency.create({
                            pair: payload.pair,
                            value: payload.rating,
                        });
                    }
                    else {
                        yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                        const configuration = yield Setting_1.Setting.findOne();
                        if (((currency.value + payload.rating) >= configuration.action_value)) {
                            yield Robot.resetStage(payload.pair);
                            if (configuration.auto_action)
                                yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                    email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                        }
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                else if (currentState.recieved_messages.length === 0 ||
                    !Robot.includes(currentState, constants_1.Message_Type.STEP_1_UP)) {
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: [...currentState.recieved_messages,
                            { message_type: payload.message_type, value: payload.rating }] });
                    if (!currency) {
                        yield Currency_1.Currency.create({
                            pair: payload.pair,
                            value: payload.rating,
                        });
                    }
                    else {
                        yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                        const configuration = yield Setting_1.Setting.findOne();
                        if (((currency.value + payload.rating) >= configuration.action_value)) {
                            yield Robot.resetStage(payload.pair);
                            if (configuration.auto_action)
                                yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                    email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                        }
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step4UpHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    yield CurrentState_1.CurrentState.create({
                        recieved_messages: [{ message_type: payload.message_type, value: payload.rating }],
                        pair: payload.pair,
                    });
                    if (!currency) {
                        yield Currency_1.Currency.create({
                            pair: payload.pair,
                            value: payload.rating,
                        });
                    }
                    else {
                        yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                        const configuration = yield Setting_1.Setting.findOne();
                        if (((currency.value + payload.rating) >= configuration.action_value)) {
                            yield Robot.resetStage(payload.pair);
                            if (configuration.auto_action)
                                yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                    email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                        }
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                else if (currentState.recieved_messages.length == 0 ||
                    !Robot.includes(currentState, constants_1.Message_Type.STEP_4_UP)) {
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: [...currentState.recieved_messages,
                            { message_type: payload.message_type, value: payload.rating }] });
                    if (!currency) {
                        yield Currency_1.Currency.create({
                            pair: payload.pair,
                            value: payload.rating,
                        });
                    }
                    else {
                        yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                        const configuration = yield Setting_1.Setting.findOne();
                        if (((currency.value + payload.rating) >= configuration.action_value)) {
                            yield Robot.resetStage(payload.pair);
                            if (configuration.auto_action)
                                yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                    email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                        }
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static includes(currentState, message_type) {
        const index = currentState.recieved_messages.findIndex((item) => item.message_type === message_type);
        console.log('index : ', index);
        return index === -1 ? false : true;
    }
    static step2UpHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_1_UP) && !Robot.includes(currentState, constants_1.Message_Type.STEP_2_UP)) {
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: [...currentState.recieved_messages,
                            { message_type: payload.message_type, value: payload.rating }] });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (((currency.value + payload.rating) >= configuration.action_value)) {
                        yield Robot.resetStage(payload.pair);
                        if (configuration.auto_action)
                            yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step3UpHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_2_UP) && !Robot.includes(currentState, constants_1.Message_Type.STEP_3_UP)) {
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: [...currentState.recieved_messages,
                            { message_type: payload.message_type, value: payload.rating }] });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value + payload.rating });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (((currency.value + payload.rating) >= configuration.action_value)) {
                        yield Robot.resetStage(payload.pair);
                        if (configuration.auto_action)
                            yield Helper_1.default.sendAction(configuration.webhook, { message_type: payload.message_type, bot_id: configuration.bot_id,
                                email_token: configuration.email_token, delay_seconds: 0, pair: payload.pair });
                    }
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step1DownHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_1_UP)) {
                    const newState = [];
                    currentState.recieved_messages.forEach((item) => {
                        if (item === constants_1.Message_Type.STEP_1_UP)
                            return;
                        newState.push(item);
                    });
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: newState });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value - payload.rating });
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (configuration) {
                        yield Helper_1.default.sendAction(configuration.webhook, { action: 'close_at_market_price', message_type: payload.message_type, bot_id: configuration.bot_id, email_token: configuration.email_token });
                    }
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step2DownHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_2_UP)) {
                    const newState = [];
                    currentState.recieved_messages.forEach((item) => {
                        if (item === constants_1.Message_Type.STEP_2_UP)
                            return;
                        newState.push(item);
                    });
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: newState });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value - payload.rating });
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (configuration) {
                        yield Helper_1.default.sendAction(configuration.webhook, { action: 'close_at_market_price', message_type: payload.message_type, bot_id: configuration.bot_id, email_token: configuration.email_token });
                    }
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step3DownHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_2_UP)) {
                    const newState = [];
                    currentState.recieved_messages.forEach((item) => {
                        if (item === constants_1.Message_Type.STEP_3_UP)
                            return;
                        newState.push(item);
                    });
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: newState });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value - payload.rating });
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (configuration) {
                        yield Helper_1.default.sendAction(configuration.webhook, { action: 'close_at_market_price', message_type: payload.message_type, bot_id: configuration.bot_id, email_token: configuration.email_token });
                    }
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static step4DownHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const currentState = yield CurrentState_1.CurrentState.findOne({ pair: payload.pair });
                const currency = yield Currency_1.Currency.findOne({ pair: payload.pair });
                if (!currentState) {
                    return res.status(200).send({ status: true });
                }
                else if (Robot.includes(currentState, constants_1.Message_Type.STEP_4_UP)) {
                    const newState = [];
                    currentState.recieved_messages.forEach((item) => {
                        if (item === constants_1.Message_Type.STEP_4_UP)
                            return;
                        newState.push(item);
                    });
                    yield CurrentState_1.CurrentState.updateOne({
                        pair: payload.pair,
                    }, { recieved_messages: newState });
                    yield Currency_1.Currency.updateOne({ pair: payload.pair }, { value: currency.value - payload.rating });
                    yield DBLog_1.DbLog.create({
                        pair: payload.pair,
                        message_type: payload.message_type,
                        rating: payload.rating
                    });
                    const configuration = yield Setting_1.Setting.findOne();
                    if (configuration) {
                        yield Helper_1.default.sendAction(configuration.webhook, { action: 'close_at_market_price', message_type: payload.message_type, bot_id: configuration.bot_id, email_token: configuration.email_token });
                    }
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static emotDownHanlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const configuration = yield Setting_1.Setting.findOne();
                if (configuration) {
                    yield Helper_1.default.sendAction(configuration.webhook, { action: 'close_at_market_price', message_type: payload.message_type, bot_id: configuration.bot_id, email_token: configuration.email_token });
                }
                res.status(200).send({ success: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static handleOnPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                switch (payload.message_type) {
                    case constants_1.Message_Type.STEP_1_UP:
                        Robot.step1UpHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_2_UP:
                        Robot.step2UpHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_3_UP:
                        Robot.step3UpHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_4_UP:
                        Robot.step4UpHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_1_DOWN:
                        Robot.step1DownHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_2_DOWN:
                        Robot.step2DownHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_3_DOWN:
                        Robot.step3DownHanlder(req, res);
                        break;
                    case constants_1.Message_Type.STEP_4_DOWN:
                        Robot.step4DownHanlder(req, res);
                        break;
                    case constants_1.Message_Type.EMOT_DOWN:
                        Robot.emotDownHanlder(req, res);
                        break;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Robot;
