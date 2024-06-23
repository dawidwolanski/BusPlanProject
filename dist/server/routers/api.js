"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DatabaseService_1 = __importDefault(require("../Services/DatabaseService"));
const apirouter = express_1.default.Router();
apirouter.get('/departures/:connectionId', async (req, res) => {
    const connectionId = parseInt(req.params.connectionId);
    try {
        const departures = await DatabaseService_1.default.getDepartures(connectionId);
        res.json(departures);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.get('/connectionprice/:connectionId', async (req, res) => {
    const connectionId = parseInt(req.params.connectionId);
    try {
        const prices = await DatabaseService_1.default.getConnectionPrice(connectionId);
        res.json(prices);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.get('/userconnections/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const connections = await DatabaseService_1.default.getUserConnections(userId);
        res.json(connections);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.post('/finduser', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await DatabaseService_1.default.findUser(login, password);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.get('/busstops/:connectionId', async (req, res) => {
    const connectionId = parseInt(req.params.connectionId);
    try {
        const busStops = await DatabaseService_1.default.getBusStops(connectionId);
        res.json(busStops);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.get('/searchconnections', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
        res.json([]);
        return;
    }
    try {
        const options = await DatabaseService_1.default.searchConnections(searchTerm);
        res.json(options);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
apirouter.get('/connections', async (req, res) => {
    try {
        const connections = await DatabaseService_1.default.getConnections();
        res.json(connections);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = apirouter;
//# sourceMappingURL=api.js.map