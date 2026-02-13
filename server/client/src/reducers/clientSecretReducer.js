import { FETCH_CLIENT_SECRET } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_CLIENT_SECRET:
            return action.payload;
        default:
            return state;
    }
}