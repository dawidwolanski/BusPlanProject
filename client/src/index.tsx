import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import Panel from './pages/Panel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/panel' element={<Panel />}></Route>
      </Routes>
    </Router>

  </React.StrictMode>
);

