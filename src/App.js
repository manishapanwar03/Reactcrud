
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Employee from './Components/Employee';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navbar/>}/>
          <Route path="/company/:id"  element={<Employee/>} />
          <Route path="/page/:pageNumber" element={<Navbar />} />
          <Route path="/page/:pageNumber"  element={<Navbar/>} />
        </Routes>
        
      </div>
    </Router>
    </> 
  
    
  );
}

export default App;
