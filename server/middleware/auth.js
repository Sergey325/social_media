import jwt from "jsonwebtoken";

export const verifiedToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if(!token){
            return res.status(403).send("Access Denied")
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimStart()
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET)

        next()
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}