import jwt from "jsonwebtoken"



export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_TOKEN)
    } catch (e) {
        return null
    }
}

export const decodeSign = (token) => { 
    return jwt.decode(token, null)
}



