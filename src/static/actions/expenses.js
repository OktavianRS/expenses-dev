import fetch from 'isomorphic-fetch';
import { notifyStart } from './data';
import axios from 'axios';
import Cookies from 'js-cookie';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILURE,
} from '../constants';


export function fetchExpensesRequestReceived(payload) {
    return {
        type: GET_EXPENSES_SUCCESS,
        payload
    };
}

export function fetchExpensesRequestFailed() {
    return {
        type: GET_EXPENSES_FAILURE
    };
}

export function fetchExpensesRequest() {
    return {
        type: GET_EXPENSES_REQUEST
    };
}

export function fetchExpenses() {
    return (dispatch, state) => {
        dispatch(fetchExpensesRequest());
        return fetch(`${SERVER_URL}/api/v1/records/filter/${state().auth.id}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${state().auth.token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(fetchExpensesRequestReceived(response));
            })
            .catch((error) => {
                dispatch(notifyStart('Can not load expenses, please reload page'));
                dispatch(fetchCategoriesRequestFailed());
                return Promise.resolve(); // TODO: we neeed a promise here because of the tests, find a better way
            });
    };
}

export function createExpense(params) {
    const { category, cent, dollar, description, title, date } = params;
    return (dispatch, state) => {
        return axios(`${SERVER_URL}/api/v1/dashboard/records/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${state().auth.token}`,
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            data: {
                category,
                cent,
                dollar,
                description,
                title,
                date,
                user: state().auth.id
            }
        })
            .then(checkHttpStatus)
            .then(() => {
                dispatch(fetchExpenses());
            })
            .catch((error) => {
                dispatch(notifyStart('Can not create expense'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function deleteExpense(id) {
    return (dispatch, state) => {
        return axios(`${SERVER_URL}/api/v1/dashboard/records/detail/${id}/`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${state().auth.token}`,
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
            .then(checkHttpStatus)
            .then(() => {
                dispatch(fetchExpenses());
            })
            .catch((error) => {
                dispatch(notifyStart('Can not delete Expense'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function updateCategory(id, title) {
    return (dispatch, state) => {
        return axios(`${SERVER_URL}/api/v1/dashboard/categories/${id}/`, {
            method: 'put',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${state().auth.token}`,
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            data: {
                title,
                user: state().auth.id
            }
        })
            .then(checkHttpStatus)
            .then(() => {
                dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(notifyStart('Can not update category'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
