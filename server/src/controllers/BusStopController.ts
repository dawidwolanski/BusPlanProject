
import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import { BusStop } from 'shared/Interfaces/BusStop';

export const getBusStops = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        const busStops = await DatabaseService.getBusStops(connectionId);
        res.status(200).json(busStops);
    } catch (error) {
        console.error('Error fetching bus stops:', error);
        res.status(500).send('Internal server error');
    }
};

export const insertBusStop = async (req: Request, res: Response) => {
    const busStopData: BusStop = req.body;

    try {
        await DatabaseService.insertBusStop(busStopData);
        res.status(201).send('Bus stop created successfully');
    } catch (error) {
        console.error('Error creating bus stop:', error);
        res.status(500).send('Could not create bus stop');
    }
};

export const updateBusStop = async (req: Request, res: Response) => {
    const busStopData = { ...req.body, id: parseInt(req.params.id) };

    try {
        await DatabaseService.updateBusStop(busStopData);
        res.status(200).send('Bus stop updated successfully');
    } catch (error) {
        console.error('Error updating bus stop:', error);
        res.status(500).send('Could not update bus stop');
    }
};

export const deleteBusStop = async (req: Request, res: Response) => {
    const busStopId = parseInt(req.params.id);

    try {
        await DatabaseService.deleteBusStop(busStopId);
        res.status(200).send('Bus stop deleted successfully');
    } catch (error) {
        console.error('Error deleting bus stop:', error);
        res.status(500).send('Could not delete bus stop');
    }
};