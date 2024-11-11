import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import { BusConnection } from 'shared/Interfaces/BusConnection';

export const getUserConnections = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    try {
        const connections = await DatabaseService.getUserConnections(userId);
        res.status(200).json(connections);
    } catch (error) {
        console.error('Error fetching user connections:', error);
        res.status(500).send('Internal server error');
    }
};

export const getConnections = async (req: Request, res: Response) => {
    try {
        const connections = await DatabaseService.getConnections();
        res.status(200).json(connections);
    } catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).send('Internal server error');
    }
};

export const insertConnection = async (req: Request, res: Response) => {
    const connectionData: BusConnection = req.body;

    try {
        await DatabaseService.insertConnection(connectionData);
        res.status(201).send('Connection created successfully');
    } catch (error) {
        console.error('Error inserting connection:', error);
        res.status(500).send('Could not insert connection');
    }
};

export const updateConnection = async (req: Request, res: Response) => {
    const connectionData = { ...req.body, id: parseInt(req.params.id) };

    try {
        await DatabaseService.updateConnection(connectionData);
        res.status(200).send('Connection updated successfully');
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).send('Could not update connection');
    }
};

export const deleteConnection = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.id);

    try {
        await DatabaseService.deleteConnection(connectionId);
        res.status(200).send('Connection deleted successfully');
    } catch (error) {
        console.error('Error deleting connection:', error);
        res.status(500).send('Could not delete connection');
    }
};