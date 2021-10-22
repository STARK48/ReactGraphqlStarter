import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
//import SignUp from './components/pages/SignUp';
import Marketing from './components/pages/Marketing';
import Consulting from './components/pages/Consulting';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import {AuthProvider} from './context/auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/contact-us' component={ContactUs} />
          {/* <Route path='/sign-up' component={SignUp} /> */}
          <Route path='/marketing' component={Marketing} />
          <Route path='/consulting' component={Consulting} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
