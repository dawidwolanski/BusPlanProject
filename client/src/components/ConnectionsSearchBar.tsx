import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BusConnection } from '../../../Interfaces/BusConnection';

type SearchFormInputs = {
  searchTerm: string;
};

type OptionsProps = {
    connections: BusConnection[]
};

const Options: React.FC<OptionsProps> = ({ connections }) => {
    console.log(connections);
    
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
        const response = await fetch(`http://127.0.0.1:3001/api/searchconnections?searchTerm=${encodeURIComponent(value)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setConnections(result);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300); // 300ms delay

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
