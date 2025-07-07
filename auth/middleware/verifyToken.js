import jwt from 'jsonwebtoken';

export const verifyToken = ( req, res, next ) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided or malformed header.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedJWT;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Invalid or expired token. Try again.' });
    }
}

export default verifyToken