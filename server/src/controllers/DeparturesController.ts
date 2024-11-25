import { Request, Response } from 'express';
import DatabaseService from '../services/DatabaseService';
import { Departure } from 'shared/Interfaces/Departure';

export const getDepartures = async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.id);
    
    try {
        const departures = await DatabaseService.getDepartures(connectionId);
        res.status(200).json({ ok: 1, departures });
    } catch (error) {
        console.error('Error fetching departures:', error);
        res.status(500).json({ ok: 0, message: 'Internal server error' });
    }
};

export const insertDeparture = async (req: Request, res: Response) => {
    const departureData: Departure = req.body;

    try {
        await DatabaseService.insertDeparture(departureData);
        res.status(201).json({ ok: 1, message: 'Departure created successfully' });
    } catch (error) {
        console.error('Error creating departure:', error);
        res.status(500).json({ ok: 0, message: 'Could not create departure' });
    }
};

export const updateDeparture = async (req: Request, res: Response) => {
    const departureData = { ...req.body, id: parseInt(req.params.id) };

    try {
        await DatabaseService.updateDeparture(departureData);
        res.status(200).json({ ok: 1, message: 'Departure updated successfully' });
    } catch (error) {
        console.error('Error updating departure:', error);
        res.status(500).json({ ok: 0, message: 'Could not update departure' });
    }
};

export const deleteDeparture = async (req: Request, res: Response) => {
    const departureId = parseInt(req.params.id);

    try {
        await DatabaseService.deleteDeparture(departureId);
        res.status(200).json({ ok: 1, message: 'Departure deleted successfully' });
    } catch (error) {
        console.error('Error deleting departure:', error);
        res.status(500).json({ ok: 0, message: 'Could not delete departure' });
    }
};