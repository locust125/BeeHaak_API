import { getConnection } from "../database/database.js"
import bcrypt from "bcryptjs"


//AÑADIR USUARIOS
const addUsuarios = async (req, res) => {

    try {
        const{Nombre, Correo_Electronico, Contraseña} = req.body;
        let passwordHash = await bcrypt.hash(Contraseña, 8)
    
        if(Nombre == undefined || Correo_Electronico == undefined || Contraseña== undefined ){
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();
        await connection.query('INSERT INTO usuario SET ?', {Nombre : Nombre, Correo_Electronico : Correo_Electronico, Contraseña : passwordHash, Roles : "2"});
        const user = await  connection.query('SELECT * FROM usuario WHERE Correo_Electronico = ?', Correo_Electronico)
        const idUser = user[0].Id; 
        console.log("este es el id del usuario: " + idUser); 



        const data = {
            user: user
        }


        res.send(data)
    }
    catch
    {
        res.send(500);
        res.send(error.messenge);
    }
}; 


export const methods ={
    addUsuarios
};  
