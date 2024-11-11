import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import SearchConnectionsParams from 'shared/Types/SearchConnectionsParams';
import { getDaysSearchOrder } from '../utils/utils';

export const searchConnections = async (req: Request, res: Response) => {
    try {
        const { travelAfterTimestamp, ...searchParams }: SearchConnectionsParams = req.query;
        const selectedTimestamp = travelAfterTimestamp ? Number(travelAfterTimestamp) : Date.now();

        if (isNaN(selectedTimestamp)) {
            res.status(400).json({ message: 'Invalid travel timestamp parameter' });
            return 
        }

        const dayToSearch = new Date(selectedTimestamp).getDay();
        const daysSearchOrder = getDaysSearchOrder(dayToSearch);
        const queryData = { ...searchParams, travelAfterTimestamp: selectedTimestamp };

        const options = await DatabaseService.searchConnections(queryData, daysSearchOrder);
        res.json(options);
    } catch (error) {
        console.error('Error in /searchconnections:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}