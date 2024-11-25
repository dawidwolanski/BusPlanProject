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
      res.status(401).json({ ok: 0, message: 'Unauthorized' });
      return 
    }

    const recordId = req.params.id;
    
    if (!recordId) {
      res.status(400).json({ ok: 0, message: 'Record ID is required' });
      return 
    }

    try {
      const record = await DatabaseService.getRecordOwnerId(model, recordId);
      if (record.owner_id !== userId) {
        res.status(403).json({ ok: 0, message: 'Forbidden: You do not own this record' });
        return 
      }
      next();
    } catch (error) {
      console.error('Error checking ownership:', error);
      res.status(500).json({ ok: 0, message: 'Internal server error' });
    }
  };
};
