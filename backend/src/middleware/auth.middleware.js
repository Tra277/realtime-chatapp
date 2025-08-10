import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log('🔍 Token from cookies:', token);
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Không có token',token: token });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Token không hợp lệ' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}