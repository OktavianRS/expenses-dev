import { createReducer } from '../utils';
import {
    GET_EXPENSES_REQUEST,
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_FAILURE,
} from '../constants';


const initialState = {
    isFetching: false,
    isFetched: false,
    count: null,
    expenses: [],
};

export default createReducer(initialState, {
    [GET_EXPENSES_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true,
        });
    },
    [GET_EXPENSES_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: true,
            count: payload.count,
            expenses: payload.results,
        });
    },
    [GET_EXPENSES_FAILURE]: (state) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: false,
        });
    },
});
