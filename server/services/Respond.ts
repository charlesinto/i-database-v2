import { Response } from "express";

/**
 * This is function that returns a response object to the client.
 * @param res The Express Response object.
 * @param status The status code.
 * @param ok The success status as true or false.
 * @param message The message to be sent to the client.
 * @param data The data to be sent to the client.
 */
export default function respond(
  res: Response,
  status: number,
  ok: boolean,
  message: string | boolean,
  data?: any
) {
  return res.status(status).send({ ok, message, data });
}
