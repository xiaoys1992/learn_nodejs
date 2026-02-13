import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientSecretReducer from './clientSecretReducer';

export default combineReducers({
    auth: authReducer,
    paymentIntent: clientSecretReducer
});