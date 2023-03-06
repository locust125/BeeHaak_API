import { getConnection } from "./../database/database.js"
import {verifyToken} from "../helpers/generateToken.js"


//Agregar al carrito
const aniadir = async (req, res) => {

    try {
        const{Id_Producto} = req.body;

        if(!Id_Producto){
            res.status(500);
            return res.json("Producto no encontrado")
        }

        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        const connection = await getConnection();
        const precio = await connection.query("SELECT Costo_producto FROM producto WHERE id_producto = ?", Id_Producto);
        const costo = await precio[0].Costo_producto;
        await connection.query('INSERT INTO carrito SET ?', {Id_Producto : Id_Producto, Cantidad : "1", id_usuario : tokenData.id, Subtotal : costo});
        res.json({message: "Producto añadido"}); 
    } 
    catch
    { 
        res.status(500);
        return res.json("error")
        
    }
}; 

//Cambiar cantidad

const cambiarCantidad = async (req, res) => {
    try {
        const { id } = req.params;
        const{Cantidad} = req.body;

        if(Cantidad == undefined){
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const producto ={Cantidad}
        const connection = await getConnection();
        await connection.query("UPDATE carrito SET ?  WHERE Id = ?", [producto, id]);
        const result = await connection.query("SELECT Id_Producto, Cantidad, id_usuario FROM carrito WHERE Id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//VER CARRITO DE USUARIO

const visualizar = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop() 
        const tokenData = await verifyToken(token)
        
        const connection = await getConnection();
        const result = await connection.query("SELECT Id_Producto, cantidad FROM carrito WHERE id_usuario = ?", tokenData.id);
        res.json(result);
    } catch (error) { 
        res.status(500);
        res.send(error.message);
    }
};

//finalizar compra
const finalizar = async (req, res) => {
    try {
       
        const token = req.headers.authorization.split(' ').pop() 
        const tokenData = await verifyToken(token)

        const connection = await getConnection();
        await connection.query("DELETE FROM carrito WHERE id_usuario = ?", tokenData.id);
        res.json({message: "C0mpra finalizada"});
    } catch (error) {
        res.status(500);
        res.send("Ocurrio un error");
    }
};

export const methods ={ 
    aniadir,
    cambiarCantidad,
    visualizar,
    finalizar
}; 