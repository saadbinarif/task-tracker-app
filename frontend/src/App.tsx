
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
// import Home from './pages/Home'
import Navbar from './common/components/Navigation'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import Navigation from "./common/components/Navigation"

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <div className="pages">
          <Routes>
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
            <Route 
            path="/signup"
            element={<Signup />}
            />
            <Route 
            path="/signin"
            element={<Signin />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
