type Days = 'week' | 'saturday' | 'sunday';

export interface Departure {
    id: number,
    connection_id,
    departure_hour: number,
    departure_minutes: number,
    days: Days
}