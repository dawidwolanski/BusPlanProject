export interface BusConnection{
    id: number,
    connection_name: string,
    owner_id: number,
    notes?: string,
    total_travel_time: number
    departure_place: string,
    destination_place: string
}