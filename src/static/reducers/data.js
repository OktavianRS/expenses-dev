import { createReducer } from '../utils';
import { DATA_RECEIVE_PROTECTED_DATA, DATA_FETCH_PROTECTED_DATA_REQUEST, NOTIFY_STARTED, NOTIFY_FINISHED } from '../constants';

const initialState = {
    data: null,
    isFetching: false,
    showNotify: false,
    message: '',
};

export default createReducer(initialState, {
    [DATA_RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },
    [DATA_FETCH_PROTECTED_DATA_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [NOTIFY_STARTED]: (state, payload) => {
        console.log(payload)
        return Object.assign({}, state, {
            showNotify: true,
            message: payload
        });
    },
    [NOTIFY_FINISHED]: (state) => {
        return Object.assign({}, state, {
            showNotify: false,
            message: '',
        });
    }
});
