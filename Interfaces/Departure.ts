type Days = 'week' | 'saturday' | 'sunday';

export interface Departure {
    departure_hour: number,
    departure_minutes: number,
    days: Days
}