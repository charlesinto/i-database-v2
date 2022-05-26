import MailGun from "mailgun-js";

class MailService {
  params;
  mailgun;
  from;
  to;
  subject;
  text;
  constructor(to: string, subject: string, params: object, content: string) {
    this.text = content;
    this.params = params;
    this.mailgun = MailGun({
      apiKey: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN as string,
    });
    this.from = "iAssets <me@samples.mailgun.org>";

    const whiteListedEmail = [
      "charles.onuorah@yahoo.com",
      "opeadesina@gmail.com",
      "opeadesina@emmsofts.com",
    ];
    this.to = whiteListedEmail.join(",");
    this.subject = subject;
  }

  send() {
    return new Promise(async (resolve, reject) => {
      try {
        var data = {
          from: this.from,
          to: this.to,
          subject: this.subject,
          html: this.text,
        };

        this.mailgun.messages().send(data, function (error: any, body: any) {
          if (error) {
            console.log("callehhhh");
            return reject({ message: "failed", error });
          }
          console.log("success ooo", body);
          resolve({ message: "success" });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default MailService;
