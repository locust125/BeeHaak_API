import { getConnection } from "../database/database.js"

//VER USUARIO
const getUsuarios = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario");
        console.log(result);
        res.json(result);
    }
    catch
    {
        res.send(500);
        res.send(error.messenge);
    }
};

//BUSCAR USUARIO POR ID
const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, Nombre, Correo_Electronico, Contraseña FROM usuario WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//ELIMINAR USUARIO
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM usuario WHERE id = ?", id);
        res.json({message: "Usuario eliminado"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods ={
    getUsuarios,
    getUsuario,
    deleteUsuario
};  