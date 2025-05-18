//authMiddleware.js
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not provided'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    });
};
export { verifyToken }