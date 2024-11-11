import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import { ConnectionPrice } from 'shared/Interfaces/ConnectionPrice'; 

export const getConnectionPrice = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        const connectionPrice = await DatabaseService.getConnectionPrice(connectionId);
        if (!connectionPrice) {
            res.status(404).send('Connection price not found');
            return 
        }
        res.status(200).json(connectionPrice);
    } catch (error) {
        console.error('Error fetching connection price:', error);
        res.status(500).send('Internal server error');
    }
};

export const insertConnectionPrice = async (req: Request, res: Response) => {
    const connectionPriceData: ConnectionPrice = req.body;

    try {
        await DatabaseService.insertConnectionPrice(connectionPriceData);
        res.status(201).send('Connection price created successfully');
    } catch (error) {
        console.error('Error creating connection price:', error);
        res.status(500).send('Could not create connection price');
    }
};

export const updateConnectionPrice = async (req: Request, res: Response) => {
    const connectionPriceData = { ...req.body, connection_id: parseInt(req.params.connectionId) };

    try {
        await DatabaseService.updateConnectionPrice(connectionPriceData);
        res.status(200).send('Connection price updated successfully');
    } catch (error) {
        console.error('Error updating connection price:', error);
        res.status(500).send('Could not update connection price');
    }
};

export const deleteConnectionPrice = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        await DatabaseService.deleteConnectionPrice(connectionId);
        res.status(200).send('Connection price deleted successfully');
    } catch (error) {
        console.error('Error deleting connection price:', error);
        res.status(500).send('Could not delete connection price');
    }
};