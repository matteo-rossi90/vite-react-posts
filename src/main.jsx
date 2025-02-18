// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PostDetails from './PostDetails';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  </Router>
);
