import React, { useState } from 'react';
import { BusStop } from 'shared/Interfaces/BusStop';
import ENDPOINTS from '../../config/endpoints';
import styles from './BusListings.module.scss';
import { SearchListing } from '../../containers/ConnectionsSearch/ConnectionsSearch';
import Button from '../Button/Button';

interface BusListingsProps {
    listings: SearchListing[]
}

const BusListings: React.FC<BusListingsProps> = ({ listings }) => {
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [busStops, setBusStops] = useState<BusStop[]>([]);

  const fetchBusStops = async (connectionId: number) => {
    try {
      const response = await fetch(ENDPOINTS.BUS_STOPS.GET(connectionId), {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setBusStops(data.busStops as BusStop[]);
    } catch (error: any) {
      console.error('Error fetching bus stops:', error);
    }
  };

  const handleRowClick = (listing: SearchListing) => {
    setSelectedListing(listing.id);
    fetchBusStops(listing.connection_id);
  };

  const handleHideDetails = () => {
    setSelectedListing(null);
    setBusStops([]);
  };

  const calcStopArrivalTime = (listing: SearchListing, busStop: BusStop) => {
    const date = new Date();
    date.setHours(listing.departure_hour);
    date.setMinutes(listing.departure_minutes + busStop.time_from_start);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


  const formatTime = (hour: number, minutes: number) => {
    const date = new Date();
    date.setHours(hour, minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.results} id='connections'>
        <h2 className={styles['results-heading']}>Connections</h2>
        <table className={styles['table-container']}>
        <thead>
            <tr className={styles['table-row']}>
            <th>Route</th>
            <th>Departure Time</th>
            <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {listings && listings.map((listing) => (
            <React.Fragment key={listing.id}>
                <tr className={styles['table-row']} onClick={() => handleRowClick(listing)}>
                    <td>{listing.departure_place} to {listing.destination_place}</td>
                    <td>{formatTime(listing.departure_hour, listing.departure_minutes)}</td>
                    <td>{listing.price_per_full_travel}PLN</td>
                </tr>
                {selectedListing === listing.id && busStops.length > 0 && (
                <tr className={styles['table-row']}>
                    <td colSpan={3} className={styles['bus-stops-container']}>
                        <div className={styles['bus-stops']}>
                            <h3>Bus stops</h3>
                            <ul>
                            {busStops.map((stop) => (
                                <li key={stop.id}>
                                {stop.stop_number}. {stop.stop_name}, estimated arrival time: {calcStopArrivalTime(listing, stop)}
                                </li>
                            ))}
                            </ul>
                            {listing.notes && <p>Notes: {listing.notes}</p>}
                            <Button label='Hide details' onClick={handleHideDetails} className={styles['hide-details-btn']}></Button>
                        </div>
                    </td>
                </tr>
                )}
            </React.Fragment>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default BusListings;