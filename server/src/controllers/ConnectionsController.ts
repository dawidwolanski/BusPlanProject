import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import { BusConnection } from 'shared/Interfaces/BusConnection';

export const getUserConnections = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    try {
        const connections = await DatabaseService.getUserConnections(userId);
        res.status(200).json({ ok: 1, connections });
    } catch (error) {
        console.error('Error fetching user connections:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
    }
};

export const getConnections = async (req: Request, res: Response) => {
    try {
        const connections = await DatabaseService.getConnections();
        res.status(200).json({ ok: 1, connections });
    } catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
    }
};

export const insertConnection = async (req: Request, res: Response) => {
    const connectionData: BusConnection = req.body;
    connectionData.owner_id = req.session?.user?.id;

    try {
        const response = await DatabaseService.insertConnection(connectionData);
        res.status(201).json({ ok: 1, message: 'Connection created successfully', data: response });
    } catch (error) {
        console.error('Error inserting connection:', error);
        res.status(500).json({ ok: 0, message: 'Could not insert connection' });
    }
};

export const updateConnection = async (req: Request, res: Response) => {
    const connectionData = { ...req.body, id: parseInt(req.params.id) };

    try {
        await DatabaseService.updateConnection(connectionData);
        res.status(200).json({ ok: 1, message: 'Connection updated successfully' });
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).json({ ok: 0, message: 'Could not update connection' });
    }
};

export const deleteConnection = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.id);

    try {
        await DatabaseService.deleteConnection(connectionId);
        res.status(200).json({ ok: 1, message: 'Connection deleted successfully' });
    } catch (error) {
        console.error('Error deleting connection:', error);
        res.status(500).json({ ok: 0, message: 'Could not delete connection' });
    }
};