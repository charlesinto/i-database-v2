import Express from "express";
import Report from "../controller/Report";
import User from "../controller/User";
import { handleErrorAsync } from "../middleware/ErrorHandler";

const router = Express.Router();

router.post("/login", handleErrorAsync(User.login));

router.post("/register", handleErrorAsync(User.register));

router.get("/get-coin-report", handleErrorAsync(Report.getCoinPairReport));

export default router;
