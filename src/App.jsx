
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AddCar from './components/AddCar';
import Car from './components/Car';
import GlobalProvider from './GlobalContext';


function App() {

  return (
    <GlobalProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/car" element={<Car />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;

