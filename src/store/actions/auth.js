import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authLogutTimer = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		const reqBody = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		dispatch(authStart());
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApLVBMk_fVPYwo1VRA6dfYQ2p5YR3hMeA';
		if (!isSignup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApLVBMk_fVPYwo1VRA6dfYQ2p5YR3hMeA';
		}
		axios
			.post(url, reqBody)
			.then((res) => {
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('user', res.data.localId);
				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(authLogutTimer(res.data.expiresIn));
			})
			.catch((error) => {
				// dispatch(authFailed(error.response.data.error));
				dispatch(authFailed(error));
			});
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				dispatch(authSuccess(token, userId));
				dispatch(authLogutTimer((expirationDate.getTime() - new Date().getTime()) / 1000));
			} else {
				dispatch(logout());
			}
		}
	};
};
