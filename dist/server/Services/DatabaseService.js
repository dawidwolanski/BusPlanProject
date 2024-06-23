"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class DatabaseService {
    constructor() {
        this.connection = mysql2_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err.stack);
                return;
            }
            console.log('Connected to the database as id ' + this.connection.threadId);
        });
    }
    async getDepartures(connection_id) {
        const sql = 'SELECT departure_hour, departure_minutes, days FROM departures WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);
        return result;
    }
    async getConnectionPrice(connection_id) {
        const sql = 'SELECT price_per_full_travel, price_per_stop FROM ticket_prices WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);
        return result[0] ?? null;
    }
    async getUserConnections(user_id) {
        const sql = 'SELECT id, connection_name, notes, total_travel_time FROM bus_connections WHERE owner_id = ?';
        const result = await this.queryPromise(sql, [user_id]);
        return result;
    }
    async getConnections() {
        const sql = 'SELECT id, connection_name, notes, total_travel_time FROM bus_connections';
        const result = await this.queryPromise(sql, []);
        return result;
    }
    async findUser(login, password) {
        const sql = 'SELECT id, username, type, password FROM users WHERE login = ? AND password = ?';
        const result = await this.queryPromise(sql, [login, password]);
        return result[0] ?? null;
    }
    async getBusStops(connection_id) {
        const sql = 'SELECT stop_number, stop_name, time_from_start FROM bus_stops WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);
        return result;
    }
    async searchConnections(searchTerm) {
        const searchWords = searchTerm.split(/\s*-\s*|\s+/);
        const sql = `
            SELECT id, connection_name, notes, total_travel_time 
            FROM bus_connections 
            WHERE 1 
        ` + searchWords.map(word => ` AND connection_name LIKE ?`).join('');
        const result = await this.queryPromise(sql, searchWords.map(word => `%${word}%`));
        return result;
    }
    queryPromise(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}
exports.default = new DatabaseService();
//# sourceMappingURL=DatabaseService.js.map