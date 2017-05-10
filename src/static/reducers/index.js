import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import categoriesReducer from './categories';
import expensesReducer from './expenses';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    categories: categoriesReducer,
    expenses: expensesReducer,
    routing: routerReducer
});
