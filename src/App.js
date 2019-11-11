import React from 'react';
import logo from './logo.svg';
import './App.css';
import React from 'react';

import Home from './Home'
import About from './About'
import Login from './Login'
import Navbar from './Navbar'
import SignUp from './SignUp'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
   <>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
   </>
   </Router>
  );
}

export default App;
