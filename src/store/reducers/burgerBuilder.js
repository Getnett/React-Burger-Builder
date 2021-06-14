import * as actionTypes from '../actions/actionTypes';

const INGRIDENT_PRICES = {
	meat: 1.3,
	cheese: 0.5,
	salad: 0.4,
	bacon: 0.7,
};

const initialState = {
	ingridents: null,
	totalPrice: 4,
	error: false,
	building: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGRIDENT:
			return {
				...state,
				ingridents: {
					...state.ingridents,
					[action.ingrident]: state.ingridents[action.ingrident] + 1,
				},
				totalPrice: state.totalPrice + INGRIDENT_PRICES[action.ingrident],
				building: true,
			};
		case actionTypes.REMOVE_INGRGIENT:
			return {
				...state,
				ingridents: {
					...state.ingridents,
					[action.ingrident]: state.ingridents[action.ingrident] - 1,
				},
				totalPrice: state.totalPrice - INGRIDENT_PRICES[action.ingrident],
				building: true,
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingridents: action.ingredients,
				error: false,
				totalPrice: 4,
				building: false,
			};
		case actionTypes.INGERIDENTS_FETCH_FAILED:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
};

export default reducer;
