import { request, response, Router } from "express";
import { methods as loginControllers} from "./../Controllers/loginControllers.js";

const router = Router();

    router.post("/", loginControllers.login);

export default router;  