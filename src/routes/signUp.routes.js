import { request, response, Router } from "express";
import { methods as signUp} from "../Controllers/signUp.js";

const router = Router();

    router.post("/", signUp.addUsuarios);

export default router;  