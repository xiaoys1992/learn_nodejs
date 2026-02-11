import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(reducers, {},applyMiddleware(reduxThunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);  

console.log('STRIPE KEY IS:',process.env.REACT_APP_STRIPE_KEY);
console.log('environment:',process.env.NODE_ENV);


//ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));

