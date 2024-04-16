
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
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
