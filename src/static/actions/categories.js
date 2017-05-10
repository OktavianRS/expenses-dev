import fetch from 'isomorphic-fetch';
import { notifyStart } from './data';
import axios from 'axios';
import Cookies from 'js-cookie';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  HANDLE_CHECK,
  HANDLE_UNCHECK,
} from '../constants';


export function fetchCategoriesRequestReceived(payload) {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload
    };
}

export function checkNewCategorie(payload) {
    return {
        type: HANDLE_CHECK,
        payload
    }
}

export function uncheckNewCategorie(payload) {
    return {
        type: HANDLE_UNCHECK,
        payload
    }
}

export function fetchCategoriesRequestFailed() {
    return {
        type: GET_CATEGORIES_FAILURE
    };
}

export function fetchCategoriesRequest() {
    return {
        type: GET_CATEGORIES_REQUEST
    };
}

export function fetchCategories() {
    return (dispatch, state) => {
        dispatch(fetchCategoriesRequest());
        return fetch(`${SERVER_URL}/api/v1/dashboard/filter/${state().auth.id}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${state().auth.token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(fetchCategoriesRequestReceived(response));
            })
            .catch((error) => {
                dispatch(notifyStart('Some error occurred when tryed to load page, please reload page'))
                dispatch(fetchCategoriesRequestFailed());
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function createCategory(title) {
    return (dispatch, state) => {
        return axios(`${SERVER_URL}/api/v1/dashboard/categories`, {
            method: 'post',
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
            .then((response) => {
                dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(notifyStart('Category not created, please try again'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function deleteCategory(id) {
    return (dispatch, state) => {
        return axios(`${SERVER_URL}/api/v1/dashboard/categories/${id}/`, {
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
                dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(notifyStart('Can not delete category'));
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
