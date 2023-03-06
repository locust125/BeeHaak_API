import { getConnection } from "../database/database.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const login = async (req, res) => {

    try
    {
        const { Correo_Electronico, Contraseña } = req.body;
        if(!Correo_Electronico || !Contraseña)res.status(400).json("Faltan datos")
        const connection = await getConnection();
            const rows = await connection.query("SELECT * FROM usuario where Correo_Electronico = ?",[Correo_Electronico])
                if(!rows.length>0) return res.status(401).json("Gmail invalido")
                    const Compracion = await bcrypt.compare(Contraseña,rows[0].Contraseña)
                        if(!Compracion) return res.status(401).json("Contraseña incorrecta")
                            const id = rows[0].Id;
                            const rol = rows[0].Roles;
                            const token = jwt.sign({id,rol},process.env.JWT_TOKEN,{expiresIn: "24h"})
                            res.json(
                            {
                            token
                            }) 
    }
    catch 
    {
        return res.json("Ocurrio un error")
    }

};


export const methods ={
    login
};