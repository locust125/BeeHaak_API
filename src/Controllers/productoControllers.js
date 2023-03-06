import { getConnection } from "./../database/database.js"

//PAGINACION
const paginacion = async (req, res) => {
    const {page} = req.params;
    const Paginas = 5;
    const skip = (page-1) * Paginas;
    const limite = skip + "," + Paginas;
    
    const connection = await getConnection();
    const rows =   await connection.query("SELECT * FROM producto")
    const numRows = rows.length;
    const numPaginas = Math.ceil(numRows/Paginas);
    console.log(numPaginas)
    const result = await connection.query("SELECT * FROM producto Limit " + limite)
    res.status(200).json(result)
};

//VER PRODUCTO
const verProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM producto");
        console.log(result);
        res.json(result); 
    }
    catch
    {
        res.send(500);
        res.send(error.messenge);
    }
};

//BUSCAR PRODUCTO POR ID
const buscarId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url FROM producto WHERE Id_producto = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//AÑADIR PRODUCTOS
const aniadirProducto = async (req, res) => {

    try {
        const{Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url } = req.body;

        if(Id_Categoria == undefined || Nombre_Producto == undefined || Descripcion_Producto == undefined || Costo_Producto == undefined || Existencias == undefined || image_url == undefined){
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();
        await connection.query("INSERT INTO producto (Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url) VALUE (?,?,?,?,?,?)", [Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url]);
        res.json({message: "Producto añadido"}); 
    } 
    catch
    {
        res.send(500);
        res.send("ocurrio un erro"); 
    }
};

//EDITAR PRODUCTOS
const editarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const{Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url } = req.body;

        if(Id_Categoria == undefined || Nombre_Producto == undefined || Descripcion_Producto == undefined || Costo_Producto == undefined || Existencias == undefined || image_url == undefined){
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const producto ={Id_Categoria, Nombre_Producto, Descripcion_Producto, Costo_Producto, Existencias, image_url}
        const connection = await getConnection();
         await connection.query("UPDATE producto SET ?  WHERE Id_producto = ?", [producto, id]);
        await res.json({message: "Producto editado"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//ELIMINAR PRODUCTO
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM producto WHERE Id_producto = ?", id);
        res.json({message: "Usuario eliminado"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


//BUSQUEDA POR NOMBRE

const name = async (req, res) => {

    const { Nombre_Producto } = req.body
    const connection = await getConnection();
    const resultado = await connection.query("SELECT * FROM producto WHERE Nombre_Producto = ?", Nombre_Producto);
    if(resultado.length <=0) res.json(404) 
    else{
    res.json(resultado)}
};


//filtrado

const filtrado = async (req, res) => {

    try {
        const {precio} = req.params
        const limit = precio
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM producto WHERE Costo_Producto <="+ limit)
        res.status(200).json(result)
    }
    catch
    {
        res.send(500);
        res.send(error.messenge);
    }
};

export const methods ={

    paginacion,
    verProductos,
    buscarId,
    aniadirProducto, 
    editarProducto,
    eliminarProducto,
    name,
    filtrado
    
};