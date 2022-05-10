import { Message_Type } from "../constants";

export interface IActionMessageB {
  message_type: string;
  bot_id: number;
  email_token: string;
  delay_seconds: number;
  pair: string;
  type?: "ActionMessageB" | "ActionMessageS";
  mailRecipients?: string;
}

export interface IActionMessageS {
  action: string;
  message_type: string;
  bot_id: number;
  email_token: string;
  delay_seconds: number;
  pair: string;
  type?: "ActionMessageB" | "ActionMessageS";
  mailRecipients?: string;
}

export interface IPayload {
  message_type: Message_Type;
  rating: number;
  pair: string;
}

export interface Mail_Options {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: {
    content: any;
    filename: string;
    type: string;
    disposition: string;
  }[];
}
