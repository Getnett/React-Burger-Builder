import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseOrderSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_ORDER_SUCCESS,
		orderId: id,
		orderData,
	};
};

export const purchasOrderFail = (error) => {
	return {
		type: actionTypes.PURCHASE_ORDER_FAIL,
		error,
	};
};
export const purchaseOrderStart = () => {
	return {
		type: actionTypes.PURCHASE_ORDER_START,
	};
};

export const purchaseOrderDone = () => {
	return {
		type: actionTypes.PURCHASE_ORDER_COMPELETION,
	};
};
export const sendPurchaseOrderData = (order, token) => {
	return (dispatch) => {
		dispatch(purchaseOrderStart());
		axios
			.post('/orders.json?auth=' + token, order)
			.then((res) => {
				dispatch(purchaseOrderSuccess(res.data.name, order));
			})
			.catch((error) => {
				dispatch(purchasOrderFail(error));
			});
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	};
};

export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		axios
			.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}" `)
			.then((res) => {
				console.log('[ORDER-DATA]', res);
				let fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ id: key, ...res.data[key] });
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch((error) => {
				console.log('[ORDER]', error);
				dispatch(fetchOrdersFail(error));
			});
	};
};
