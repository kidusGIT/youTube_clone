import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reportWebVitals from './reportWebVitals';

// componenets
import commenProprties from './redux/reducer'

const store = createStore(
    commenProprties, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <App />
    </Provider>
);

reportWebVitals();
