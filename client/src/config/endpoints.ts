const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
const API_BASE_URL = `${VITE_APP_BASE_URL}/api`



const ENDPOINTS = {
    DEPARTURES: {
        GET: (connectionId: number) => `${API_BASE_URL}/departures/${connectionId}`,
        CREATE: `${API_BASE_URL}/departures`,
        UPDATE: (id: number) => `${API_BASE_URL}/departures/${id}`,
        DELETE: (id: number) => `${API_BASE_URL}/departures/${id}`
    },
    CONNECTION_PRICES: {
        GET: (connectionId: number) => `${API_BASE_URL}/connection-prices/${connectionId}`,
        CREATE: `${API_BASE_URL}/connection-prices`,
        UPDATE: (connectionId: number) => `${API_BASE_URL}/connection-prices/${connectionId}`,
        DELETE: (connectionId: number) => `${API_BASE_URL}/connection-prices/${connectionId}`
    },
    USER_CONNECTIONS: (userId: number) => `${API_BASE_URL}/user-connections/${userId}`,
    CONNECTIONS: {
        GET_ALL: `${API_BASE_URL}/connections`,
        CREATE: `${API_BASE_URL}/connections`,
        UPDATE: (id: number) => `${API_BASE_URL}/connections/${id}`,
        DELETE: (id: number) => `${API_BASE_URL}/connections/${id}`
    },
    BUS_STOPS: {
        GET: (connectionId: number) => `${API_BASE_URL}/bus-stops/${connectionId}`,
        CREATE: `${API_BASE_URL}/bus-stops`,
        UPDATE: (id: number) => `${API_BASE_URL}/bus-stops/${id}`,
        DELETE: (id: number) => `${API_BASE_URL}/bus-stops/${id}`
    },
    SEARCH_CONNECTIONS: (searchTerm: string) => `${API_BASE_URL}/searchconnections?searchTerm=${encodeURIComponent(searchTerm)}`,
    USER: {
        STATUS: `${API_BASE_URL}/user/status`,
        REGISTER: `${API_BASE_URL}/user/register`,
        LOGIN: `${API_BASE_URL}/user/login`,
        LOGOUT: `${API_BASE_URL}/user/logout`
    }
};


export default ENDPOINTS;
