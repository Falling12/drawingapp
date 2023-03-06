import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        req.user = jwt.decode(token);
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}