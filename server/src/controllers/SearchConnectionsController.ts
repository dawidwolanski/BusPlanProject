import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import SearchConnectionsParams from 'shared/Types/SearchConnectionsParams';


export const searchConnections = async (req: Request, res: Response) => {
    try {
        const { travelAfterTimestamp } = req.query as SearchConnectionsParams;
        
        const selectedTimestamp = travelAfterTimestamp ?
            Number(travelAfterTimestamp) :
            new Date(new Date().setHours(0, 0, 0, 0)).getTime();

        if (isNaN(selectedTimestamp)) {
            res.status(200).json({ ok: 0, message: 'Invalid travel timestamp parameter' });
            return;
        }

        req.query.travelAfterTimestamp = selectedTimestamp.toString();
        const options = await DatabaseService.searchConnections(req.query as SearchConnectionsParams);
        res.status(200).json({ ok: 1, options });
    } catch (error) {
        console.error('Error in /searchconnections:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
    }
}