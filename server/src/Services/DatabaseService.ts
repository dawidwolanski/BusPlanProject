import mysql, { Connection } from 'mysql2';
import { Departure } from 'shared/Interfaces/Departure';
import { ConnectionPrice } from 'shared/Interfaces/ConnectionPrice';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import { User, UserWithPasswordHash } from 'shared/Interfaces/User';
import { BusStop } from 'shared/Interfaces/BusStop';
import LoginType from 'shared/Enums/LoginType'
import searchConnectionsParams from 'shared/Types/searchConnectionsParams'

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
        const sql = 'SELECT id, departure_hour, departure_minutes, days FROM departures WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);

        return result;
    }

    async insertDeparture(departureData: Departure): Promise<void> {
        const sql = 'INSERT INTO departures (connection_id, departure_hour, departure_minutes, days) VALUES (?, ?, ?, ?)';
        const values = [departureData.connection_id, departureData.departure_hour, departureData.departure_minutes, departureData.days];
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error creating departure:', error);
            throw new Error('Could not create departure');
        }
    }
    
    async updateDeparture(departureData: Omit<Departure, 'id'> & { id: number }): Promise<void> {
        const updates = [];
        const values = [];
    
        if (departureData.connection_id !== undefined) {
            updates.push('connection_id = ?');
            values.push(departureData.connection_id);
        }
        if (departureData.departure_hour !== undefined) {
            updates.push('departure_hour = ?');
            values.push(departureData.departure_hour);
        }
        if (departureData.departure_minutes !== undefined) {
            updates.push('departure_minutes = ?');
            values.push(departureData.departure_minutes);
        }
        if (departureData.days) {
            updates.push('days = ?');
            values.push(departureData.days);
        }
    
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }
    
        const sql = `UPDATE departures SET ${updates.join(', ')} WHERE id = ?`;
        values.push(departureData.id);
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error updating departure:', error);
            throw new Error('Could not update departure');
        }
    }
    
    async deleteDeparture(departureId: number): Promise<void> {
        const sql = 'DELETE FROM departures WHERE id = ?';
    
        try {
            await this.queryPromise(sql, [departureId]);
        } catch (error) {
            console.error('Error deleting departure:', error);
            throw new Error('Could not delete departure');
        }
    }

    async getConnectionPrice(connection_id: number): Promise<ConnectionPrice | null> {
        const sql = 'SELECT connection_id, price_per_full_travel, price_per_stop FROM ticket_prices WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);
    
        return result[0] ?? null;
    }
    
    async insertConnectionPrice(connectionPriceData: ConnectionPrice): Promise<void> {
        const sql = 'INSERT INTO ticket_prices (connection_id, price_per_full_travel, price_per_stop) VALUES (?, ?, ?)';
        const values = [connectionPriceData.connection_id, connectionPriceData.price_per_full_travel, connectionPriceData.price_per_stop];
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error creating connection price:', error);
            throw new Error('Could not create connection price');
        }
    }
    
    async updateConnectionPrice(connectionPriceData: Omit<ConnectionPrice, 'connection_id'> & { connection_id: number }): Promise<void> {
        const updates = [];
        const values = [];
    
        if (connectionPriceData.price_per_full_travel !== undefined) {
            updates.push('price_per_full_travel = ?');
            values.push(connectionPriceData.price_per_full_travel);
        }
        if (connectionPriceData.price_per_stop !== undefined) {
            updates.push('price_per_stop = ?');
            values.push(connectionPriceData.price_per_stop);
        }
    
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }
    
        const sql = `UPDATE ticket_prices SET ${updates.join(', ')} WHERE connection_id = ?`;
        values.push(connectionPriceData.connection_id);
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error updating connection price:', error);
            throw new Error('Could not update connection price');
        }
    }
    
    async deleteConnectionPrice(connectionId: number): Promise<void> {
        const sql = 'DELETE FROM ticket_prices WHERE connection_id = ?';
    
        try {
            await this.queryPromise(sql, [connectionId]);
        } catch (error) {
            console.error('Error deleting connection price:', error);
            throw new Error('Could not delete connection price');
        }
    }

    async getUserConnections(user_id: number): Promise<BusConnection[]> {
        const sql = 'SELECT id, connection_name, notes, total_travel_time, departure_place, destination_place FROM bus_connections WHERE owner_id = ?';
        const result = await this.queryPromise(sql, [user_id]);

        return result;
    }

    async getConnections(): Promise<BusConnection[]> {
        const sql = 'SELECT id, owner_id, connection_name, notes, total_travel_time, departure_place, destination_place FROM bus_connections';
        const result = await this.queryPromise(sql, []);

        return result;
    }

    async insertConnection(connectionData: BusConnection): Promise<void> {
        const sql = 'INSERT INTO bus_connections (connection_name, notes, total_travel_time, owner_id, departure_place, destination_place) VALUES (?, ?, ?, ?)';
        const values = [connectionData.connection_name, connectionData.notes, connectionData.total_travel_time, connectionData.owner_id, connectionData.departure_place, connectionData.destination_place];
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error inserting connection:', error);
            throw new Error('Could not insert connection');
        }
    }
    
    async updateConnection(connectionData: Omit<BusConnection, 'id'> & { id: number }): Promise<void> {
        const updates = [];
        const values = [];
    
        if (connectionData.connection_name) {
            updates.push('connection_name = ?');
            values.push(connectionData.connection_name);
        }
        if (connectionData.notes !== undefined) {
            updates.push('notes = ?');
            values.push(connectionData.notes);
        }
        if (connectionData.total_travel_time !== undefined) {
            updates.push('total_travel_time = ?');
            values.push(connectionData.total_travel_time);
        }
    
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }
    
        const sql = `UPDATE bus_connections SET ${updates.join(', ')} WHERE id = ?`;
        values.push(connectionData.id);
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error updating connection:', error);
            throw new Error('Could not update connection');
        }
    }

    async deleteConnection(connectionId: number) {
        const sql = 'DELETE FROM bus_connections WHERE id = ?';
        return await this.queryPromise(sql, [connectionId])
    }

    async getBusStops(connection_id: number): Promise<BusStop[]> {
        const sql = 'SELECT id, connection_id, stop_number, stop_name, time_from_start FROM bus_stops WHERE connection_id = ?';
        const result = await this.queryPromise(sql, [connection_id]);

        return result;
    }
    
    async insertBusStop(busStopData: BusStop): Promise<void> {
        const sql = 'INSERT INTO bus_stops (connection_id, stop_number, stop_name, time_from_start) VALUES (?, ?, ?, ?)';
        const values = [busStopData.connection_id, busStopData.stop_number, busStopData.stop_name, busStopData.time_from_start];
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error creating bus stop:', error);
            throw new Error('Could not create bus stop');
        }
    }
    
    async updateBusStop(busStopData: Omit<BusStop, 'id'> & { id: number }): Promise<void> {
        const updates = [];
        const values = [];
    
        if (busStopData.stop_number !== undefined) {
            updates.push('stop_number = ?');
            values.push(busStopData.stop_number);
        }
        if (busStopData.stop_name) {
            updates.push('stop_name = ?');
            values.push(busStopData.stop_name);
        }
        if (busStopData.time_from_start !== undefined) {
            updates.push('time_from_start = ?');
            values.push(busStopData.time_from_start);
        }
        
    
        if (updates.length === 0) {
            throw new Error('No fields to update');
        }
    
        const sql = `UPDATE bus_stops SET ${updates.join(', ')} WHERE id = ?`;
        values.push(busStopData.id);
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error updating bus stop:', error);
            throw new Error('Could not update bus stop');
        }
    }
    
    async deleteBusStop(busStopId: number): Promise<void> {
        const sql = 'DELETE FROM bus_stops WHERE id = ?';
    
        try {
            await this.queryPromise(sql, [busStopId]);
        } catch (error) {
            console.error('Error deleting bus stop:', error);
            throw new Error('Could not delete bus stop');
        }
    }

    async findUser({input, type}: {input: string, type: LoginType}): Promise<UserWithPasswordHash> | null {
        const searchedField = type;
        const sql = `SELECT id, username, type, password_hash FROM users WHERE ${searchedField} = ?`;
        const result = await this.queryPromise(sql, [input]);

        return result[0] ?? null;
    }

    async insertUser(userData: { username: string; email: string; hashedPassword: string; }) {
        const sql = 'INSERT INTO users (username, email, password_hash, type) VALUES (?, ?, ?, ?)';
        const values = [userData.username, userData.email, userData.hashedPassword, 'casual'];
    
        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user');
        }
    }

    async updateUser(userData: Omit<UserWithPasswordHash, 'id'> & { id: number }): Promise<void> {
        const updates = [];
        const values = [];

        if (userData.username) {
            updates.push('username = ?');
            values.push(userData.username);
        }
        if (userData.email) {
            updates.push('email = ?');
            values.push(userData.email);
        }
        if (userData.passwordHash) {
            updates.push('password_hash = ?');
            values.push(userData.passwordHash);
        }

        if (updates.length === 0) {
            throw new Error('No fields to update');
        }

        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        values.push(userData.id);

        try {
            await this.queryPromise(sql, values);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Could not update user');
        }
    }

    async deleteUser(userId: number): Promise<void> {
        const sql = 'DELETE FROM users WHERE id = ?';

        try {
            await this.queryPromise(sql, [userId]);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Could not delete user');
        }
    }

    async searchConnections(params: searchConnectionsParams, daysOrder: string[]): Promise<BusConnection[]> {
        const { connection_id, departure_place, destination_place } = params;
        const sqlParams: (string | number)[] = [];
        const areSearchPlaceParamsEmpty = [connection_id, departure_place, destination_place].every(v => typeof v !== undefined)

        const placeCriteria = connection_id 
            ? 'bus_connections.id = ?' 
            : 'bus_connections.departure_place = ? AND bus_connections.destination_place = ?';
    
        if (connection_id) {
            sqlParams.push(connection_id);
        } else {
            sqlParams.push(departure_place, destination_place);
        }

        const whereClauseCriteria = areSearchPlaceParamsEmpty ? '1' : placeCriteria
    
        const daysOrderString = daysOrder.map(day => `'${day}'`).join(', ');
        const orderByCriteria = `
            ORDER BY 
                FIELD(departures.days, ${daysOrderString}), 
                departures.departure_hour, 
                departures.departure_minutes
        `;
    
        const sql = `
            SELECT * 
            FROM bus_connections
            INNER JOIN departures ON bus_connections.id = departures.connection_id
            INNER JOIN ticket_prices ON bus_connections.id = ticket_prices.connection_id
            WHERE ${whereClauseCriteria}
            ${orderByCriteria}
            LIMIT 20;
        `;

        try {
            const result = await this.queryPromise(sql, sqlParams);
            return result;
        } catch (error) {
            console.error("Error executing searchConnections query:", error);
            throw new Error("Failed to fetch connections data.");
        }
    }

    async getRecordOwnerId(model: string, recordId: string): Promise<{ owner_id: number }> {
        const allowedModels = ['bus_connections'];
    
        if (!allowedModels.includes(model)) {
          throw new Error('Invalid model name');
        }
    
        const sql = `SELECT owner_id FROM ?? WHERE id = ?`;
        
        try {
          const result = await this.queryPromise(sql, [model, recordId]);
          
          if (result.length === 0) {
            throw new Error('Record not found');
          }
          
          return result[0];
        } catch (error) {
          throw new Error(`Error retrieving record: ${error.message}`);
        }
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
