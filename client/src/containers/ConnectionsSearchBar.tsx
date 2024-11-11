import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BusConnection } from 'shared/Interfaces/BusConnection';
import ENDPOINTS from '../config/endpoints';

type SearchFormInputs = {
  searchTerm: string;
};

type OptionsProps = {
    connections: BusConnection[]
};

const Options: React.FC<OptionsProps> = ({ connections }) => {
    return (
        <div>
            {
                connections.map(connection =>
                    <button key={connection.id}>{connection.connection_name}</button>
                )
            }
        </div>
    )
}

const ConnectionsSearchBar: React.FC = () => {
  const { register, setValue } = useForm<SearchFormInputs>();
  const [connections, setConnections] = useState<BusConnection[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = async (value: string) => {
    setValue('searchTerm', value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      try {
        const response = await fetch(ENDPOINTS.SEARCH_CONNECTIONS(value));
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setConnections(result);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="container mt-5">
      <form>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search connections..."
          {...register('searchTerm')}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </form>
      <Options connections={connections}/>
    </div>
  );
};

export default ConnectionsSearchBar;
