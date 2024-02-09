import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { AuthContext } from './AuthContext';
import Container from '@mui/material/Container';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Container>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
