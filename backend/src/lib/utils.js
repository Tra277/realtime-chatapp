import jwt from 'jsonwebtoken';


export const generateJwtToken = (userId, res) => {
    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
    console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('🆔 Creating token for userId:', userId);
    
    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION || '1h'
    });

    console.log('🍪 Setting cookie with token:', token.substring(0, 20) + '...');
    
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 1 hour
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    };
    
    console.log('🍪 Cookie options:', cookieOptions);
    
    res.cookie('jwt', token, cookieOptions);
    console.log('✅ Cookie set successfully');

    return token;
};
