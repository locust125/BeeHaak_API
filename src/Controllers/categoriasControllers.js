import { getConnection } from "../database/database.js"

const filtrado = async (req, res) => {

    const { id } = req.params;
    const connection = await getConnection();
    const [resultado] = await connection.query("SELECT * FROM producto WHERE Id_Categoria = ?", id);
    if(resultado.length <=0) res.json(404)
    else{
    res.json(resultado)}
}; 

export const methods ={
    filtrado 
};