import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import LandList from './components/LandList';
import InputList from './components/InputList';
import ServiceList from './components/ServiceList';
import VideoList from './components/VideoList';
import Dashboard from './components/Dashboard'; // Placeholder for dashboard component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/land" element={<LandList />} />
        <Route path="/inputs" element={<InputList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;