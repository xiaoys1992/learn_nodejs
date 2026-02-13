import axios from 'axios';
import { FETCH_USER,FETCH_CLIENT_SECRET } from './types';
export const fetchUser = () => async dispatch=>{
const res=await axios.get('/api/current_user');
 dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch=>{
    const res=await axios.post('/api/stripe',{token});
    dispatch({type: FETCH_USER, payload: res.data});
    };

export const fetchClientSecret = () => async dispatch => {
    const res = await axios.post('/api/stripe');
    dispatch({type: FETCH_CLIENT_SECRET, payload: res.data.paymentIntent});
};

export const confirmPayment = (paymentIntentId) => async dispatch => {
    const res = await axios.post('/api/stripe/confirm',{paymentIntentId});
    dispatch({type: CONFIRM_PAYMENT, payload: res.data});
};