import { Router } from "express";
import { methods as carritoControllers} from "./../Controllers/carritoController.js";
import {checkAuth} from "../middleware/auth.js"

const router = Router();

    router.post("/", checkAuth,carritoControllers.aniadir);
    router.put("/:id", checkAuth,carritoControllers.cambiarCantidad);
    router.get("/", checkAuth,carritoControllers.visualizar);
    router.delete("/", checkAuth,carritoControllers.finalizar);

export default router;