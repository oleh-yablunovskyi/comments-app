import React from 'react';
import ReactDOM from 'react-dom';
import {
  Routes, Route, Navigate, HashRouter,
} from 'react-router-dom';
import './index.scss';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="../" replace />} />
        </Route>
      </Routes>
    </HashRouter>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
