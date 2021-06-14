import * as actionsTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case actionsTypes.AUTH_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionsTypes.AUTH_SUCCESS:
			return {
				...state,
				error: null,
				token: action.token,
				userId: action.userId,
				loading: false,
			};
		case actionsTypes.AUTH_LOGOUT:
			return {
				...state,
				error: null,
				token: null,
				userId: null,
				loading: false,
			};

		case actionsTypes.AUTH_FAILED:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case actionsTypes.AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			};

		default:
			return state;
	}
};

export default auth;
