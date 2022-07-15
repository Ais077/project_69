import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bascet from './bascet'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes ,Route, Link} from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import counterReducer from './store/counterReducer';
const store = configureStore({reducer: counterReducer})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router className="container">
    <Provider store={store}>
      <ul className="nav">
        <li><Link to="/bascet">корзина</Link></li>
        <li><Link to="/">главная</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/bascet" element={<Bascet/>}/>
      </Routes>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
