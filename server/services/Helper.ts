import Axios from "axios";
import jwt from "jsonwebtoken";
import { IActionMessageB, IActionMessageS } from "../interfaces";

class App {
  static assignToken(payload: any, expiresTime: any) {
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY || "charlesisawseosome",
      {
        expiresIn: expiresTime ? expiresTime : "2h",
      }
    );
    return token;
  }
  static decodeToken(token: any) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_KEY || "shsujnudnd"
        );
        resolve(decoded);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  static checkExpirationTime(expirationTime: any) {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const currentTime = new Date(Date.now() - tzoffset).toISOString();

    try {
      if (new Date(currentTime).getTime() >= new Date(expirationTime).getTime())
        return true;
      return false;
    } catch (er: any) {
      throw new Error(er);
    }
  }

  static discount(percentageDiscount: any, totalPrice: any) {
    try {
      return percentageDiscount * totalPrice * 0.01;
    } catch (er: any) {
      throw new Error(er);
    }
  }

  static sendAction(url: string, payload: IActionMessageS | IActionMessageB){
    return new Promise(async(resolve, reject) => {
      try{
        console.log('webhook called ooo: ', url)
        console.log('PAYLOAD: ', payload)
        const response = await Axios.post(url,payload)
        console.log('webhook called ooo')
        resolve(response.data)
      }catch(error){
        reject(error)
      }
    })
  }
}

export default App;
