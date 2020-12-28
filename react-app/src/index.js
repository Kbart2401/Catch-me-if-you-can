import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Map from "./components/Map"

ReactDOM.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Route path="/map">
        <Map />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
