import sgMail from "@sendgrid/mail";
import { Mail_Options } from "../interfaces";

class Mailer {
  static sendMail(params: Mail_Options) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);
    return sgMail.send({ ...params, from: process.env.EMAIL_FROM || "" });
  }
}

export default Mailer;
