import mysql, { Connection } from 'mysql2';
import { Departure } from '../../Interfaces/Departure';
import { ConnectionPrice } from '../../Interfaces/ConnectionPrice';
import { BusConnection } from '../../Interfaces/BusConnection';
import { User } from '../../Interfaces/User';
import { BusStop } from '../../Interfaces/BusStop';


class DatabaseService {
    connection: Connection;
    constructor() {
        this.connection = mysql.createConnection({
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

    async getDepartures(connection_id: number): Promise<Departure[]> {
        const sql = 'SELECT departure_hour, departure_minutes, days FROM departures WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);

        return result;
    }

    async getConnectionPrice(connection_id: number): Promise<ConnectionPrice[]> {
        const sql = 'SELECT price_per_full_travel, price_per_stop FROM ticket_prices WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);

        return result[0] ?? null;
    }

    async getUserConnections(user_id: number): Promise<BusConnection[]> {
        const sql = 'SELECT id, connection_name, notes, total_travel_time FROM bus_connections WHERE owner_id = ?';
        const result = await this.queryPromise(sql, [user_id]);

        return result;
    }

    async getConnections(): Promise<BusConnection[]> {
        const sql = 'SELECT id, connection_name, notes, total_travel_time FROM bus_connections';
        const result = await this.queryPromise(sql, []);

        return result;
    }

    async findUser(login: string, password: string): Promise<User & {password: string}> | null {
        const sql = 'SELECT id, username, type, password FROM users WHERE login = ? AND password = ?';
        const result = await this.queryPromise(sql, [login, password]);

        return result[0] ?? null;
    }

    async getBusStops(connection_id: number): Promise<BusStop[]> {
        const sql = 'SELECT stop_number, stop_name, time_from_start FROM bus_stops WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);

        return result;
    }

    async searchConnections(searchTerm: string): Promise<BusConnection[]> {
        const searchWords = searchTerm.split(/\s*-\s*|\s+/)

        const sql = `
            SELECT id, connection_name, notes, total_travel_time 
            FROM bus_connections 
            WHERE 1 
        ` + searchWords.map(word => ` AND connection_name LIKE ?`).join('');

        const result = await this.queryPromise(sql, searchWords.map(word => `%${word}%`));
    
        return result;
    }

    private queryPromise(sql: string, params: any[]): Promise<any> {
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





export default new DatabaseService();
