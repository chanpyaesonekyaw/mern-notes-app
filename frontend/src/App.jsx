import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.Jsx';
import Login from './pages/Login/Login.Jsx';
import SignUp from './pages/SignUp/SignUp.Jsx';

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App