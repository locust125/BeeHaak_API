import { Router } from "express";
import { methods as categoriaControllers} from "../Controllers/categoriasControllers.js";

const router = Router();

    router.get("/:id", categoriaControllers.filtrado);

export default router; 