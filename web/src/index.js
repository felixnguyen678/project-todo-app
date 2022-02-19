import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";

import './index.css';
import TasksOfProjectPage from './pages/projects/[id]/tasks';
import reportWebVitals from './reportWebVitals';
import DataContext from "./contexts/data.context";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <DataContext.provider>
      <App />
    </DataContext.provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
