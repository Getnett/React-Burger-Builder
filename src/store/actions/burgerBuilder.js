import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngerident = (name) => {
	return {
		type: actionTypes.ADD_INGRIDENT,
		ingrident: name,
	};
};
export const removeIngerident = (name) => {
	return {
		type: actionTypes.REMOVE_INGRGIENT,
		ingrident: name,
	};
};
export const setIngeridents = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};
export const ingredientsFetchFailed = () => {
	return {
		type: actionTypes.INGERIDENTS_FETCH_FAILED,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get('ingridents.json')
			.then((response) => {
				return dispatch(setIngeridents(response.data));
			})
			.catch((error) => dispatch(ingredientsFetchFailed()));
	};
};
