import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import ENDPOINTS from '../config/endpoints';
import FormTextInput from '../components/FormTextInput/FormTextInput';
import Button from '../components/Button/Button';
import styles from './Panel.module.scss';
import { BusStop } from '../../../shared/Interfaces/BusStop';
import { ConnectionPrice } from '../../../shared/Interfaces/ConnectionPrice';
import { set, useForm } from 'react-hook-form';
import EditConnectionForm from '../containers/EditConnectionForm/EditConnectionForm';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import AddConnectionForm from '../containers/AddConnectionForm/AddConnectionForm';

const Panel: React.FC = () => {
    const { user } = useUser();
    const [connections, setConnections] = useState([]);
    const [selectedConnection, setSelectedConnection] = useState<any>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [newConnection, setNewConnection] = useState({ connection_name: '', owner_id: user?.id, total_travel_time: 0, departure_place: '', destination_place: '' });

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.type !== 'entrepreneur' && user.type !== 'admin') {
        return <div className={styles.panel}>You don't have access to this site.</div>;
    }

    useEffect(() => {
        if (user) {
            if (user.type === 'entrepreneur') {
                fetchUserConnections(user.id);
            } else if (user.type === 'admin') {
                fetchAllConnections();
            }
        }
    }, [user]);

/*     useEffect(() => {
        if (selectedConnection) {
            fetchBusStops(selectedConnection.id);
            fetchConnectionPrice(selectedConnection.id);
        }
    }, [selectedConnection]); */

    const fetchUserConnections = async (userId: number) => {
        const response = await fetch(ENDPOINTS.USER_CONNECTIONS(userId));
        const data = await response.json();
        setConnections(data.connections);
    };

    const fetchAllConnections = async () => {
        const response = await fetch(ENDPOINTS.CONNECTIONS.GET_ALL);
        const data = await response.json();
        setConnections(data.connections);
    };

    const deleteConnection = async (connectionId: number) => {
        await fetch(ENDPOINTS.CONNECTIONS.DELETE(connectionId), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        // Refresh the connections list after deletion
        if (user?.type === 'entrepreneur') {
            fetchUserConnections(user.id);
        } else if (user?.type === 'admin') {
            fetchAllConnections();
        }
    };

    const handleHideForm = () => {
        setTimeout(() => {
            setSelectedConnection(null);
        }, 100);
    }

    function handleConnectionClick(connection: BusConnection): void {
        setSelectedConnection(connection);
    }

    const handleNewConnection = () => {
        if (user?.type === 'entrepreneur') {
            fetchUserConnections(user.id);
        } else if (user?.type === 'admin') {
            fetchAllConnections();
        }
    };

    const handleConnectionUpdate = () => {
        if (user?.type === 'entrepreneur') {
            fetchUserConnections(user.id);
        } else if (user?.type === 'admin') {
            fetchAllConnections();
        }
    };

    return (
        <div className={styles.panel}>
            <h1>Welcome to the {user.type === 'admin' ? 'admin' : 'entrepreneur'} panel!</h1>
            <div className={styles.section}>
                <h2>Bus Connections</h2>
                <div className={styles.list}>
                    {connections.map((connection: any) => (
                        <div key={connection.id} className={styles.listItem}>
                            <div className={styles['flex']}>
                                <div onClick={(e) => {handleConnectionClick(connection)}}>
                                        {connection.connection_name}
                                    {!selectedConnection || selectedConnection.id !== connection.id ? (
                                        <div className={styles.info}>Click to edit</div>
                                    ) : null}
                                </div>
                                <Button label="Delete" onClick={() => deleteConnection(connection.id)} className={styles.deleteButton} />

                            </div>
                            {selectedConnection && selectedConnection.id === connection.id && (
                                <div className={styles.section}>
                                    <Button label="Hide details" onClick={handleHideForm} className={styles.stickyButton} />
                                    <EditConnectionForm connection={selectedConnection} onConnectionUpdate={handleConnectionUpdate} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <AddConnectionForm onNewConnection={handleNewConnection} />
            </div>
        </div>
    );
};

export default Panel;