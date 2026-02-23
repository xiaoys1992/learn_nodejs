import { combineReducers } from 'redux';
import {reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import clientSecretReducer from './clientSecretReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer,
    paymentIntent: clientSecretReducer,
    form: reduxForm,
    surveys: surveysReducer
});