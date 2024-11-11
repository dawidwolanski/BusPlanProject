import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user && req.session.user) {
        return next();
    } else {
        return res.status(403).json({ message: 'Access denied: logged only' });
    }
};