import { Request, Response, NextFunction } from 'express';
import DatabaseService from '../services/DatabaseService';
import { UserType } from 'shared/Interfaces/User';

export const checkPrivileges = (model: string, idParam: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session?.user?.id;
    const userType = req.session?.user?.type;

    if (userType === UserType.ADMIN) {
      next()
      return
    }

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return 
    }

    const recordId = req.params[idParam];
    if (!recordId) {
      res.status(400).json({ message: 'Record ID is required' });
      return 
    }

    try {
      const record = await DatabaseService.getRecordOwnerId(model, recordId);
      if (record.owner_id !== userId) {
        res.status(403).json({ message: 'Forbidden: You do not own this record' });
        return 
      }
      next();
    } catch (error) {
      console.error('Error checking ownership:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
