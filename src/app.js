import express from "express";
import morgan from "morgan";

//Routes
import usuarios from "./routes/usuario.routes.js"
import productos from "./routes/producto.routes.js"
import login from "./routes/login.routes.js"
import signUp from "./routes/signUp.routes.js"
import carrito from "./routes/carrito.routes.js"
import categoria from "./routes/categoria.routes.js"

const app=express();

const port = process.env.PORT || 4000;

//setings 
app.set("port", `${port}`);
 
//middlewares
app.use(morgan("dev"));
app.use(express.json( ));

  
//Routes
app.use("/bee/usuario" ,usuarios);
app.use("/bee/productos" ,productos);
app.use("/bee/login" ,login);//entrar usuario
app.use("/bee/signUp" ,signUp);//crear usuariologin
app.use("/bee/carrito" ,carrito);
app.use("/bee/categoria" ,categoria);

export default app;  
