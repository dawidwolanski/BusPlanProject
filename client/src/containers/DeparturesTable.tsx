import React, { useState, useEffect } from 'react';
import { Departure } from 'shared/Interfaces/Departure';
import ENDPOINTS from '../config/endpoints';

type DeparturesTableProps = {
  connectionId: number;
};

const DeparturesTable: React.FC<DeparturesTableProps> = ({ connectionId }) => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const response = await fetch(ENDPOINTS.DEPARTURES.GET(connectionId)); // mozna pogrupowac po godzinach
        if (!response.ok) {
          throw new Error('Failed to fetch departures');
        }
        const data = await response.json();
        setDepartures(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchDepartures();
  }, [connectionId]);

  const renderDepartures = (day: 'week' | 'saturday' | 'sunday') => {
    return departures
      .filter(departure => departure.days === day)
      .map(departure => (
        <tr key={departure.id}>
          <td>{`${departure.departure_hour}:${departure.departure_minutes}`}</td>
        </tr>
      ));
  };

  return (
    <div className="container mt-5">
      <h2>Departure Times</h2>
      {error && <p className="text-danger">{error}</p>}
      {!error && (
        <>
          <h3>Monday to Friday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('week')}
            </tbody>
          </table>

          <h3>Saturday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('saturday')}
            </tbody>
          </table>

          <h3>Sunday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('sunday')}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DeparturesTable;
