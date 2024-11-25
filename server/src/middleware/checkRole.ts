import { Request, Response, NextFunction } from 'express';
import { UserType } from 'shared/Interfaces/User';

export const checkRole = (role: UserType) => (req: Request, res: Response, next: NextFunction) => {
if (req.session.user && req.session.user.type === role) {
        next();
        return
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
        return
    }
};