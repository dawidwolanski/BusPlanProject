import express, { Router, Request, Response } from 'express';
import DatabaseService from '../Services/DatabaseService';

const apirouter: Router = express.Router();

apirouter.get('/departures/:connectionId', async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        const departures = await DatabaseService.getDepartures(connectionId);
        res.json(departures);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.get('/connectionprice/:connectionId', async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        const prices = await DatabaseService.getConnectionPrice(connectionId);
        res.json(prices);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.get('/userconnections/:userId', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    try {
        const connections = await DatabaseService.getUserConnections(userId);
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.post('/finduser', async (req: Request, res: Response) => {
    const { login, password } = req.body;

    try {
        const user = await DatabaseService.findUser(login, password);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.get('/busstops/:connectionId', async (req: Request, res: Response) => {
    const connectionId = parseInt(req.params.connectionId);

    try {
        const busStops = await DatabaseService.getBusStops(connectionId);
        res.json(busStops);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.get('/searchconnections', async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm;
    
    if (!searchTerm) {
        res.json([])
        return
    }

    try {
        const options = await DatabaseService.searchConnections(searchTerm);
        res.json(options);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Internal server error' });
    }
});

apirouter.get('/connections', async (req: Request, res: Response) => {
    try {
        const connections = await DatabaseService.getConnections();
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default apirouter;
