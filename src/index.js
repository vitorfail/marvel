import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from './Context';
import Rotas from './Rotas';
import PopupMap from './componentes/PopupMap/PopupMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <PopupMap></PopupMap>
      <Rotas/>
    </Provider>
  </React.StrictMode>
);
