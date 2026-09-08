const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error('JWT_SECRET is not configured');
        return res.status(500).json({ message: 'Server authentication is not configured' });
    }

    const authorization = req.header('Authorization');
    const [scheme, token] = authorization?.trim().split(/\s+/) || [];
    
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        console.warn(`JWT validation failed: ${err.name}`);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;