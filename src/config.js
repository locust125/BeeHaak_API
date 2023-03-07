import { config } from "dotenv"; 

config();

export default {
    host: process.env.BD_HOST || "",
    database: process.env.BD_NAME || "",
    user: process.env.BD_USER || "",
    password: process.env.BD_PASSWORD || "",
    port: process.env.BD_PORT
};

