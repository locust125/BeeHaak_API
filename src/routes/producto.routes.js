import {  Router } from "express";
import { methods as productoControllers} from "./../Controllers/productoControllers.js";

const router = Router();

    router.get("/pages/:page", productoControllers.paginacion);//PAGINACION @
    router.get("/", productoControllers.verProductos);//VER PRODUCTO @
    router.get("/:id", productoControllers.buscarId);//BUSCAR PRODUCTO POR ID @
    router.post("/", productoControllers.aniadirProducto); //AÑADIR PRODUCTOS @
    router.put("/:id", productoControllers.editarProducto); //EDITAR PRODUCTOS @
    router.delete("/:id", productoControllers.eliminarProducto);//ELIMINAR PRODUCTO @
    router.post("/busqueda", productoControllers.name);//pendiente 00000000
    router.get("/filtrado/:precio", productoControllers.filtrado);//filtrado

export default router;