import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import FormTextInput from '../../components/FormTextInput/FormTextInput';
import { BusStop } from 'shared/Interfaces/BusStop';
import styles from './EditConnectionForm.module.scss';
import { ConnectionPrice } from 'shared/Interfaces/ConnectionPrice';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import { useForm } from 'react-hook-form';
import ENDPOINTS from '../../config/endpoints';
import { useUser } from '../../contexts/UserContext';
import { register } from 'module';

interface EditConnectionFormProps {
    connection: BusConnection;
    onConnectionUpdate: () => void;
}

interface ConnectionFormData {
    connection_name: string;
    departure_place: string;
    destination_place: string;
    total_travel_time: number;
}

interface BusStopFormData {
    stop_name: string;
    time_from_start: number;
}

interface PriceFormData {
    price_per_full_travel: number;
    price_per_stop: number;
}

const BusStopForm: React.FC<{ busStop: BusStop }> = ({ busStop }) => {
    const [busStops, setBusStops] = useState<BusStop[]>([]);
    const { register: registerBusStop, handleSubmit: handleBusStopSubmit } = useForm<BusStopFormData>();

    const updateBusStop = async (data: BusStopFormData) => {
        await fetch(ENDPOINTS.BUS_STOPS.UPDATE(busStop.id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...busStop, ...data })
        });
    };

    return (
        <form className={styles.form} onSubmit={handleBusStopSubmit(updateBusStop)}>
            <FormTextInput
                label="Stop Name"
                id="stop_name"
                type="text"
                register={registerBusStop('stop_name', { required: 'Stop name is required' })}
                defaultValue={busStop.stop_name}
            />
            <FormTextInput
                label="Time from Start"
                id="time_from_start"
                type="text"
                register={registerBusStop('time_from_start', { required: 'Time from start is required' })}
                defaultValue={busStop.time_from_start}
            />
            <Button label="Update Bus Stop" isSubmit />
        </form>
    );
}

const EditConnectionForm: React.FC<EditConnectionFormProps> = ({ connection, onConnectionUpdate }) => {
    const [busStops, setBusStops] = useState<BusStop[]>([]);
    const [connectionPrice, setConnectionPrice] = useState<ConnectionPrice | null>(null);
    const { register: registerConnection, handleSubmit: handleConnectionSubmit } = useForm<ConnectionFormData>();
    const { register: registerPrice, handleSubmit: handlePriceSubmit } = useForm<PriceFormData>();

    const fetchBusStops = async (connectionId: number) => {
        const response = await fetch(ENDPOINTS.BUS_STOPS.GET(connectionId));
        const data = await response.json();
        setBusStops(data.busStops);
        
    };

    const fetchConnectionPrice = async (connectionId: number) => {
        const response = await fetch(ENDPOINTS.CONNECTION_PRICES.GET(connectionId));
        const data = await response.json();
        setConnectionPrice(data.connectionPrice);
        
    };
    
    useEffect(() => {
        fetchBusStops(connection.id);
        fetchConnectionPrice(connection.id);
    }, [connection]);

    const updateConnection = async (data: ConnectionFormData) => {
        await fetch(ENDPOINTS.CONNECTIONS.UPDATE(connection.id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...connection, ...data })
        });
        onConnectionUpdate(); // Call the callback function
    };

    const updateBusStop = (busStopId: number) => async (data: BusStopFormData) => {
        const updatedBusStop: BusStop = {
            ...busStops.find(stop => stop.id === busStopId)!,
            ...data
        };
        await fetch(ENDPOINTS.BUS_STOPS.UPDATE(updatedBusStop.id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedBusStop)
        });
    };

    const updatePrice = async (price: PriceFormData) => {
        if (!connectionPrice) return;
        const response = await fetch(ENDPOINTS.CONNECTION_PRICES.UPDATE(connectionPrice.connection_id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...connectionPrice, ...price, id: connectionPrice.connection_id })
        });

    };

    const deleteConnection = async () => {
        await fetch(ENDPOINTS.CONNECTIONS.DELETE(connection.id), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
    };
    
    return (
        <>
            <h2>Edit Connection</h2>
            <form className={styles.form} onSubmit={handleConnectionSubmit(updateConnection)}>
                <FormTextInput
                    label="Connection Name"
                    id="connection_name"
                    type="text"
                    register={registerConnection('connection_name', { required: 'Connection name is required' })}
                    defaultValue={connection.connection_name}
                />
                <FormTextInput
                    label="Departure Place"
                    id="departure_place"
                    type="text"
                    register={registerConnection('departure_place', { required: 'Departure place is required' })}
                    defaultValue={connection.departure_place}
                />
                <FormTextInput
                    label="Destination Place"
                    id="destination_place"
                    type="text"
                    register={registerConnection('destination_place', { required: 'Destination place is required' })}
                    defaultValue={connection.destination_place}
                />
                <FormTextInput
                    label="Total Travel Time"
                    id="total_travel_time"
                    type="text"
                    register={registerConnection('total_travel_time', { required: 'Total travel time is required' })}
                    defaultValue={connection.total_travel_time}
                />
                <Button label="Update Connection" isSubmit />
            </form>
            
            <h2>Edit Bus Stops</h2>
            {busStops.map((busStop: BusStop) => (
                <BusStopForm key={busStop.id} busStop={busStop} />
            ))}

            <h2>Edit Connection Price</h2>
            {connectionPrice && (
                <form className={styles.form} onSubmit={handlePriceSubmit(updatePrice)}>
                    <FormTextInput
                        label="Price per Full Travel"
                        id="price_per_full_travel"
                        type="text"
                        register={registerPrice('price_per_full_travel', { required: 'Price per full travel is required' })}
                        defaultValue={connectionPrice.price_per_full_travel}
                    />
                    <FormTextInput
                        label="Price per Stop"
                        id="price_per_stop"
                        type="text"
                        register={registerPrice('price_per_stop', { required: 'Price per stop is required' })}
                        defaultValue={connectionPrice.price_per_stop}
                    />
                    <Button label="Update Price" isSubmit />
                </form>
            )}
        </>
    );
};

export default EditConnectionForm;
