import { request, response, Router } from "express";
import { methods as usuarioControllers} from "../Controllers/usuariosControllers.js";

const router = Router();

    router.get("/", usuarioControllers.getUsuarios);
    router.get("/:id", usuarioControllers.getUsuario);
    router.delete("/:id", usuarioControllers.deleteUsuario);

export default router;  