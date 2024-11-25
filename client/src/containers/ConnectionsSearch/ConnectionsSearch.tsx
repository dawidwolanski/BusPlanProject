import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import { Departure } from 'shared/Interfaces/Departure';
import { ConnectionPrice } from 'shared/Interfaces/ConnectionPrice';
import SearchConnectionParams from 'shared/Types/SearchConnectionsParams';
import ENDPOINTS from '../../config/endpoints';
import styles from './ConnectionsSearch.module.scss';
import Button from '../../components/Button/Button';
import FormTextInput from '../../components/FormTextInput/FormTextInput';
import BusListings from '../../components/BusListings/BusListings';

export type SearchListing = BusConnection & Departure & ConnectionPrice
type ApiResponse = { ok: 0 | 1; options: SearchListing[] }


const ConnectionsSearch: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchConnectionParams>();
  const [listings, setListings] = useState<SearchListing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConnections = async (params: SearchConnectionParams) => {
    setError(null);
    setIsLoading(true);

    try {
      if (params.travelAfterTimestamp) {
        params.travelAfterTimestamp = new Date(params.travelAfterTimestamp).getTime();
      }

      const queryParams = new URLSearchParams(params as any).toString();
      const response = await fetch(ENDPOINTS.SEARCH_CONNECTIONS(queryParams), {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const data: ApiResponse = await response.json();
      const options = data.options;

      setListings(options)

    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SearchConnectionParams> = (params) => {
    fetchConnections(params);
  };

  useEffect(() => {
    fetchConnections({});
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormTextInput
          label="departure place"
          id="departure_place"
          type="text"
          register={register('departure_place')}
          error={errors.departure_place}
        />
        <FormTextInput
          label="destination place"
          id="destination_place"
          type="text"
          register={register('destination_place')}
          error={errors.destination_place}
        />
        <FormTextInput
          label="travel after"
          id="travelAfterTimestamp"
          type="datetime-local"
          register={register('travelAfterTimestamp')}
          error={errors.travelAfterTimestamp}
        />
        <Button label={isLoading ? 'Loading...' : 'Search'} className={styles.submitButton} isSubmit={true} isDisabled={isLoading}></Button>
      </form>
      {error && <p className={styles.error}>{error}</p>}

      <BusListings listings={listings}></BusListings>
    </div>
  );
};

export default ConnectionsSearch;