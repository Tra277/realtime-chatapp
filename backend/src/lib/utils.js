import jwt from 'jsonwebtoken';


export const generateJwtToken = (userId, res) => {
    ;
    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION || '1h'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 1 hour,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    });

    return token;
};
