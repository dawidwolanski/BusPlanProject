import React from 'react';
import FormTextInput from '../../components/FormTextInput/FormTextInput';
import Button from '../../components/Button/Button';
import styles from './AddConnectionForm.module.scss';
import ENDPOINTS from '../../config/endpoints';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import { ConnectionPrice } from 'shared/Interfaces/ConnectionPrice';
import { useForm } from 'react-hook-form';

type FormData = BusConnection & ConnectionPrice;

interface AddConnectionFormProps {
    onNewConnection: () => void;
}

const AddConnectionForm: React.FC<AddConnectionFormProps> = ({ onNewConnection }) => {
    const { register, handleSubmit } = useForm<FormData>();

    const createConnection = async (connection: Omit<BusConnection, 'id' | 'owner_id'>) => {
        const response = await fetch(ENDPOINTS.CONNECTIONS.CREATE, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(connection),
        });
        return response.json();
    };

    const create = async (data: FormData) => {
        const response = await createConnection({ 
            connection_name: data.connection_name, 
            total_travel_time: data.total_travel_time, 
            departure_place: data.departure_place, 
            destination_place: data.destination_place, 
            notes: data.notes 
        });

        await fetch(ENDPOINTS.CONNECTION_PRICES.CREATE, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                connection_id: response.data.insertId, 
                price_per_full_travel: data.price_per_full_travel, 
                price_per_stop: data.price_per_stop 
            }),   
        });

        onNewConnection(); // Call the callback function
    };

    return (
        <>
            <h2>Add New Connection</h2>
            <form className={styles.form} onSubmit={handleSubmit(create)}>
                <FormTextInput
                    label="Connection Name"
                    id="connection_name"
                    type="text"
                    register={register('connection_name', { required: 'Connection name is required' })}
                />
                <FormTextInput
                    label="Departure Place"
                    id="departure_place"
                    type="text"
                    register={register('departure_place', { required: 'Departure place is required' })}
                />
                <FormTextInput
                    label="Destination Place"
                    id="destination_place"
                    type="text"
                    register={register('destination_place', { required: 'Destination place is required' })}
                />
                <FormTextInput
                    label="Total Travel Time"
                    id="total_travel_time"
                    type="text"
                    register={register('total_travel_time', { required: 'Total travel time is required' })}
                />
                <FormTextInput
                    label="Notes"
                    id="notes"
                    type="text"
                    register={register('notes')}
                />
                <FormTextInput
                    label="Price per Full Travel"
                    id="price_per_full_travel"
                    type="text"
                    register={register('price_per_full_travel', { required: 'Price per full travel is required' })}
                />
                <FormTextInput
                    label="Price per Stop"
                    id="price_per_stop"
                    type="text"
                    register={register('price_per_stop', { required: 'Price per stop is required' })}
                />
                <Button label="Add Connection" isSubmit />
            </form>
        </>
    );
};

export default AddConnectionForm;