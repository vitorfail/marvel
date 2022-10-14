import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from './Context';
import Rotas from './Rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Rotas/>
    </Provider>
  </React.StrictMode>
);
