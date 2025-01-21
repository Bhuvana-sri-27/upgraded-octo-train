import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentAuth from './StudentAuth';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentAuth />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;