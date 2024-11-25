import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './src/containers/Header/Header';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Profile from './src/pages/Profile';
import Panel from './src/pages/Panel';
import NotFound from './src/pages/NotFound';
import Footer from './src/components/Footer/Footer';
import { UserProvider } from './src/contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;