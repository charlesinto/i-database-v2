import { randomBytes, pbkdf2Sync } from "crypto";

export default class Password {
  static hash = async (password: string) => {
    const salt = randomBytes(20).toString("hex");
    const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString(
      "base64"
    );
    return `${salt}.${hash}`;
  };
  static compare = async (supplied: string, stored: string) => {
    const [salt, hash] = stored.split(".");
    const suppliedHash = pbkdf2Sync(
      supplied,
      salt,
      1000,
      64,
      "sha512"
    ).toString("base64");
    return hash === suppliedHash;
  };
}
