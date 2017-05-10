import { createReducer } from '../utils';
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    HANDLE_CHECK,
    HANDLE_UNCHECK,
} from '../constants';


const initialState = {
    isFetching: false,
    isFetched: false,
    count: null,
    categories: [],
    checkedCategories: []
};

export default createReducer(initialState, {
    [GET_CATEGORIES_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true,
        });
    },
    [GET_CATEGORIES_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: true,
            count: payload.count,
            categories: payload.results,
        });
    },
    [GET_CATEGORIES_FAILURE]: (state) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: false,
        });
    },
    [HANDLE_CHECK]: (state, id) => {
        return Object.assign({}, state, {
            checkedCategories: [
                ...state.checkedCategories,
                id
            ],
        });
    },
    [HANDLE_UNCHECK]: (state, id) => {
        return Object.assign({}, state, {
            checkedCategories: state.checkedCategories.filter((item) => item !== id)
        });
    },
});
