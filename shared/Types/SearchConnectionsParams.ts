type Timestamp = number

type SearchConnectionsParams = {
    connection_id?: number
    departure_place?: string
    destination_place?: string
    travelAfterTimestamp?: Timestamp
}

export default SearchConnectionsParams