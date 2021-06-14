import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as Actions from '../../store/actions/index';
class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		this.props.fetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = (
				<div>
					{this.props.orders.map((order) => (
						<Order key={order.id} ingridents={order.ingridents} price={order.price} />
					))}
				</div>
			);
		}
		return orders;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.order.loading,
		orders: state.order.orders,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchOrders: (token, userId) => dispatch(Actions.fetchOrders(token, userId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
