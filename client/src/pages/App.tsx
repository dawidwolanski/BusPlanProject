import React from 'react';
import '../styles/App.css';
import LoginForm from '../components/LoginForm';
import DeparturesTable from '../components/DeparturesTable';
import ConnectionsSearchBar from '../components/ConnectionsSearchBar';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <ConnectionsSearchBar />
      <DeparturesTable connectionId={1} />

      
    </div>
  );
}

export default App;
