import { Request, Response } from "express";
import { Message_Type } from "../constants";
import { IPayload } from "../interfaces";
import { Currency } from "../model/Currency";
import { CurrentState } from "../model/CurrentState";
import { DbLog } from "../model/DBLog";
import { Setting } from "../model/Setting";
import Helper from "../services/Helper";

class Robot {
  private static resetStage(pair: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let totalAmountToDeduct = 0;
        const currentState = await CurrentState.findOne({ pair });
        const currency = await Currency.findOne({ pair });
        const newState: { message_type: Message_Type; value: number }[] = [];
        let type!: Message_Type;

        for (let i = 0; i < currentState.recieved_messages.length; i++) {
          const item: { message_type: Message_Type; value: number } =
            currentState.recieved_messages[i];
          if (
            item.message_type === Message_Type.STEP_1_UP ||
            item.message_type === Message_Type.STEP_4_UP
          ) {
            totalAmountToDeduct = totalAmountToDeduct + item.value;
            type = item.message_type;
            newState.push({
              message_type: item.message_type,
              value: item.value,
            });
          }
        }

        await CurrentState.updateOne(
          { pair },
          { recieved_messages: [...newState] }
        );
        await Currency.updateOne({ pair }, { value: totalAmountToDeduct });

        resolve(1);
      } catch (error) {
        console.log("error: ", error);
        reject(error);
      }
    });
  }
  private static async step1UpHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      console.log("current state: ", currentState);
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        await CurrentState.create({
          recieved_messages: [
            { message_type: payload.message_type, value: payload.rating },
          ],
          pair: payload.pair,
        });

        if (!currency) {
          await Currency.create({
            pair: payload.pair,
            value: payload.rating,
            type: payload.message_type,
          });
        } else {
          await Currency.updateOne(
            { pair: payload.pair },
            {
              value: currency.value + payload.rating,
              type: payload.message_type,
            }
          );

          const configuration = await Setting.findOne();

          if (currency.value + payload.rating >= configuration.action_value) {
            await Robot.resetStage(payload.pair);
            if (configuration.auto_action)
              await Helper.sendAction(configuration.webhook, {
                message_type: "bot",
                bot_id: configuration.bot_id,
                email_token: configuration.email_token,
                delay_seconds: 0,
                pair: payload.pair,
                type: "ActionMessageB",
                mailRecipients: configuration.emailRecipients,
              });
          }
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      } else if (
        currentState.recieved_messages.length === 0 ||
        !Robot.includes(currentState, Message_Type.STEP_1_UP)
      ) {
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          {
            recieved_messages: [
              ...currentState.recieved_messages,
              { message_type: payload.message_type, value: payload.rating },
            ],
          }
        );

        if (!currency) {
          await Currency.create({
            pair: payload.pair,
            value: payload.rating,
          });
        } else {
          await Currency.updateOne(
            { pair: payload.pair },
            {
              value: currency.value + payload.rating,
              type: payload.message_type,
            }
          );

          const configuration = await Setting.findOne();

          if (currency.value + payload.rating >= configuration.action_value) {
            await Robot.resetStage(payload.pair);

            if (configuration.auto_action)
              await Helper.sendAction(configuration.webhook, {
                message_type: "bot",
                bot_id: configuration.bot_id,
                email_token: configuration.email_token,
                delay_seconds: 0,
                pair: payload.pair,
                type: "ActionMessageB",
                mailRecipients: configuration.emailRecipients,
              });
          }
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }

  private static async step4UpHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        await CurrentState.create({
          recieved_messages: [
            { message_type: payload.message_type, value: payload.rating },
          ],
          pair: payload.pair,
        });

        if (!currency) {
          await Currency.create({
            pair: payload.pair,
            value: payload.rating,
          });
        } else {
          await Currency.updateOne(
            { pair: payload.pair },
            {
              value: currency.value + payload.rating,
              type: payload.message_type,
            }
          );

          const configuration = await Setting.findOne();

          if (currency.value + payload.rating >= configuration.action_value) {
            await Robot.resetStage(payload.pair);
            if (configuration.auto_action)
              await Helper.sendAction(configuration.webhook, {
                message_type: "bot",
                bot_id: configuration.bot_id,
                email_token: configuration.email_token,
                delay_seconds: 0,
                pair: payload.pair,
                type: "ActionMessageB",
                mailRecipients: configuration.emailRecipients,
              });
          }
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      } else if (
        currentState.recieved_messages.length == 0 ||
        !Robot.includes(currentState, Message_Type.STEP_4_UP)
      ) {
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          {
            recieved_messages: [
              ...currentState.recieved_messages,
              { message_type: payload.message_type, value: payload.rating },
            ],
          }
        );

        if (!currency) {
          await Currency.create({
            pair: payload.pair,
            value: payload.rating,
          });
        } else {
          await Currency.updateOne(
            { pair: payload.pair },
            {
              value: currency.value + payload.rating,
              type: payload.message_type,
            }
          );

          const configuration = await Setting.findOne();

          if (currency.value + payload.rating >= configuration.action_value) {
            await Robot.resetStage(payload.pair);

            if (configuration.auto_action)
              await Helper.sendAction(configuration.webhook, {
                message_type: "bot",
                bot_id: configuration.bot_id,
                email_token: configuration.email_token,
                delay_seconds: 0,
                pair: payload.pair,
                type: "ActionMessageB",
                mailRecipients: configuration.emailRecipients,
              });
          }
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static includes(currentState: any, message_type: string) {
    const index = currentState.recieved_messages.findIndex(
      (item: { message_type: Message_Type; value: number }) =>
        item.message_type === message_type
    );

    console.log("index : ", index);

    return index === -1 ? false : true;
  }
  private static async step2UpHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      console.log("payload: ", payload);
      console.log("message type: ", payload.message_type);
      await Currency.updateOne(
        { pair: payload.pair },
        { type: payload.message_type }
      );
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (
        Robot.includes(currentState, Message_Type.STEP_1_UP) &&
        !Robot.includes(currentState, Message_Type.STEP_2_UP)
      ) {
        console.log("called ooo: ", payload);
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          {
            recieved_messages: [
              ...currentState.recieved_messages,
              { message_type: payload.message_type, value: payload.rating },
            ],
          }
        );

        await Currency.updateOne(
          { pair: payload.pair },
          { value: currency.value + payload.rating, type: payload.message_type }
        );

        const configuration = await Setting.findOne();

        if (currency.value + payload.rating >= configuration.action_value) {
          await Robot.resetStage(payload.pair);
          if (configuration.auto_action)
            await Helper.sendAction(configuration.webhook, {
              message_type: "bot",
              bot_id: configuration.bot_id,
              email_token: configuration.email_token,
              delay_seconds: 0,
              pair: payload.pair,
              type: "ActionMessageB",
              mailRecipients: configuration.emailRecipients,
            });
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static async step3UpHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      await Currency.updateOne(
        { pair: payload.pair },
        { type: payload.message_type }
      );
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (
        Robot.includes(currentState, Message_Type.STEP_2_UP) &&
        !Robot.includes(currentState, Message_Type.STEP_3_UP)
      ) {
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          {
            recieved_messages: [
              ...currentState.recieved_messages,
              { message_type: payload.message_type, value: payload.rating },
            ],
          }
        );

        await Currency.updateOne(
          { pair: payload.pair },
          { value: currency.value + payload.rating, type: payload.message_type }
        );

        const configuration = await Setting.findOne();

        if (currency.value + payload.rating >= configuration.action_value) {
          await Robot.resetStage(payload.pair);
          if (configuration.auto_action)
            await Helper.sendAction(configuration.webhook, {
              message_type: "bot",
              bot_id: configuration.bot_id,
              email_token: configuration.email_token,
              delay_seconds: 0,
              pair: payload.pair,
              type: "ActionMessageB",
              mailRecipients: configuration.emailRecipients,
            });
        }

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }

  private static async step1DownHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (Robot.includes(currentState, Message_Type.STEP_1_UP)) {
        const newState: { message_type: Message_Type; value: number }[] = [];

        currentState.recieved_messages.forEach(
          (item: { message_type: Message_Type; value: number }) => {
            if (item.message_type === Message_Type.STEP_1_UP) return;
            newState.push(item);
          }
        );
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          { recieved_messages: newState }
        );

        console.log(
          ">>>: ",
          currency.value,
          payload.rating,
          currency.value + payload.rating
        );
        await Currency.updateOne(
          { pair: payload.pair },
          {
            value: parseInt(currency.value) + +payload.rating,
            type: payload.message_type,
          }
        );

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }
      const configuration = await Setting.findOne();

      if (configuration) {
        await Helper.sendAction(configuration.webhook, {
          action: "close_at_market_price",
          message_type: "bot",
          bot_id: configuration.bot_id,
          email_token: configuration.email_token,
          delay_seconds: 0,
          pair: payload.pair,
          type: "ActionMessageS",
          mailRecipients: configuration.emailRecipients,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static async step2DownHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (Robot.includes(currentState, Message_Type.STEP_2_UP)) {
        const newState: { message_type: Message_Type; value: number }[] = [];

        currentState.recieved_messages.forEach(
          (item: { message_type: Message_Type; value: number }) => {
            if (item.message_type === Message_Type.STEP_2_UP) return;
            newState.push(item);
          }
        );
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          { recieved_messages: newState }
        );

        await Currency.updateOne(
          { pair: payload.pair },
          {
            value: parseInt(currency.value) + +payload.rating,
            type: payload.message_type,
          }
        );

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      const configuration = await Setting.findOne();

      if (configuration) {
        await Helper.sendAction(configuration.webhook, {
          action: "close_at_market_price",
          message_type: "bot",
          bot_id: configuration.bot_id,
          email_token: configuration.email_token,
          delay_seconds: 0,
          pair: payload.pair,
          type: "ActionMessageS",
          mailRecipients: configuration.emailRecipients,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static async step3DownHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (Robot.includes(currentState, Message_Type.STEP_3_UP)) {
        const newState: { message_type: Message_Type; value: number }[] = [];

        currentState.recieved_messages.forEach(
          (item: { message_type: Message_Type; value: number }) => {
            if (item.message_type === Message_Type.STEP_3_UP) return;
            newState.push(item);
          }
        );
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          { recieved_messages: newState }
        );

        await Currency.updateOne(
          { pair: payload.pair },
          {
            value: parseInt(currency.value) + +payload.rating,
            type: payload.message_type,
          }
        );

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      const configuration = await Setting.findOne();

      if (configuration) {
        await Helper.sendAction(configuration.webhook, {
          action: "close_at_market_price",
          message_type: "bot",
          bot_id: configuration.bot_id,
          email_token: configuration.email_token,
          delay_seconds: 0,
          pair: payload.pair,
          type: "ActionMessageS",
          mailRecipients: configuration.emailRecipients,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static async step4DownHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currentState = await CurrentState.findOne({ pair: payload.pair });
      const currency = await Currency.findOne({ pair: payload.pair });
      if (!currentState) {
        return res.status(200).send({ status: true });
      } else if (Robot.includes(currentState, Message_Type.STEP_4_UP)) {
        const newState: { message_type: Message_Type; value: number }[] = [];

        currentState.recieved_messages.forEach(
          (item: { message_type: Message_Type; value: number }) => {
            if (item.message_type === Message_Type.STEP_4_UP) return;
            newState.push(item);
          }
        );
        await CurrentState.updateOne(
          {
            pair: payload.pair,
          },
          { recieved_messages: newState }
        );

        await Currency.updateOne(
          { pair: payload.pair },
          {
            value: parseInt(currency.value) + +payload.rating,
            type: payload.message_type,
          }
        );

        await DbLog.create({
          pair: payload.pair,
          message_type: payload.message_type,
          rating: payload.rating,
        });
      }

      const configuration = await Setting.findOne();

      if (configuration) {
        await Helper.sendAction(configuration.webhook, {
          action: "close_at_market_price",
          message_type: "bot",
          bot_id: configuration.bot_id,
          email_token: configuration.email_token,
          delay_seconds: 0,
          pair: payload.pair,
          type: "ActionMessageS",
          mailRecipients: configuration.emailRecipients,
        });
      }

      res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  private static async emotDownHanlder(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;

      const currency = await Currency.findOne({ pair: payload.pair });

      await Currency.updateOne(
        { pair: payload.pair },
        {
          value: parseInt(currency.value) + +payload.rating,
          type: payload.message_type,
        }
      );

      const configuration = await Setting.findOne();

      if (currency.value + payload.rating >= configuration.action_value) {
        await Robot.resetStage(payload.pair);
        if (configuration.auto_action)
          await Helper.sendAction(configuration.webhook, {
            message_type: "bot",
            bot_id: configuration.bot_id,
            email_token: configuration.email_token,
            delay_seconds: 0,
            pair: payload.pair,
            type: "ActionMessageS",
            mailRecipients: configuration.emailRecipients,
          });
      }

      await DbLog.create({
        pair: payload.pair,
        message_type: payload.message_type,
        rating: payload.rating,
      });

      return res.status(200).send({ success: true });
    } catch (error) {
      throw error;
    }
  }
  static async handleOnPost(req: Request, res: Response) {
    try {
      const payload: IPayload = req.body;
      console.log("payload gotten: ", payload);

      switch (payload.message_type) {
        case Message_Type.STEP_1_UP:
          Robot.step1UpHanlder(req, res);
          break;
        case Message_Type.STEP_2_UP:
          Robot.step2UpHanlder(req, res);
          break;
        case Message_Type.STEP_3_UP:
          Robot.step3UpHanlder(req, res);
          break;
        case Message_Type.STEP_4_UP:
          Robot.step4UpHanlder(req, res);
          break;
        case Message_Type.STEP_1_DOWN:
          Robot.step1DownHanlder(req, res);
          break;
        case Message_Type.STEP_2_DOWN:
          Robot.step2DownHanlder(req, res);
          break;
        case Message_Type.STEP_3_DOWN:
          Robot.step3DownHanlder(req, res);
          break;
        case Message_Type.STEP_4_DOWN:
          Robot.step4DownHanlder(req, res);
          break;
        case Message_Type.EMOT_DOWN:
          Robot.emotDownHanlder(req, res);
          break;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateConfiguration(req: Request, res: Response) {
    try {
      console.log("response: ", req.body);
      await Setting.updateOne({}, { ...req.body });

      return res.status(200).send({ success: true });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  static async getConfiguration(req: Request, res: Response) {
    try {
      const setting = await Setting.findOne({});

      return res.status(200).send({ success: true, data: setting });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default Robot;
