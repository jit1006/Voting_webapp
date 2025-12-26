import jwt from 'jsonwebtoken';
const jwtAuthMiddleware = (req, res, next) => {
    // first check request header as authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "invalid token" });
    // extract the jwt token from the request header 
    const token = authorization.split(' ')[1]; // saparating space at index 0 and token at index 1
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        // verify the jwt token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // attach user information to the object
        req.user = decode; //storing decoded data.
        next();3
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalied token" });
    }
}
//function to generate jwt token
const generateToken = (userData) => {
    //generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 }); //30sec
}
export { jwtAuthMiddleware, generateToken };