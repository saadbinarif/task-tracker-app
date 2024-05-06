
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import Navigation from "./common/components/Navigation"
import Footer from './common/components/Footer';
import { useSelector } from 'react-redux';
import { useAuth } from './common/hooks/useAuth';
import TaskPage from './pages/TaskPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(): JSX.Element {
const isAuthenticated = useSelector((s: any)=>s.auth.isAuthenticated)

const {isLoggedIn} = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <div className="pages">
        
          <Routes>
          <Route 
              path="/" 
              element={<Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} 
            />
            <Route 
            path="/signup"
            element={!isAuthenticated? <Signup /> : <Navigate to="/dashboard" />}
            />
            <Route 
            path="/signin"
            element={!isAuthenticated? <Signin /> : <Navigate to="/dashboard" />}
            />
            <Route 
            path="/taskpage"
            element={isAuthenticated ? <TaskPage /> : <Navigate to="/signin" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
      <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"        
        />
    </div>
  );
}

export default App;
