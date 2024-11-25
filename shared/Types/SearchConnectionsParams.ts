type Timestamp = number

type SearchConnectionsParams = {
    departure_place?: string
    destination_place?: string
    travelAfterTimestamp?: Timestamp
}

export default SearchConnectionsParams