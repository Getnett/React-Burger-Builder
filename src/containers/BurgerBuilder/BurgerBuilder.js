import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import * as Actions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		isOrdered: false,
		error: false,
	};

	componentDidMount() {
		this.props.initIngredients();
	}

	updatePurchasbleState = (ingridents) => {
		const sum = Object.keys(ingridents)
			.map((igkey) => {
				return ingridents[igkey];
			})
			.reduce((sum, curVal) => {
				return sum + curVal;
			}, 0);
		return sum > 0;
	};
	orderHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ isOrdered: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};
	cancelOrderHandler = () => {
		this.setState({ isOrdered: false });
	};
	continueOrderHandler = () => {
		this.props.purchaseOrderDone();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ingridents,
		};
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		console.log('TAG1:', disabledInfo);
		let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Cant fetch ingridents </p> : <Spinner />;

		let orderSummary = null;
		if (this.props.ingridents) {
			burger = (
				<Aux>
					<Burger ingridents={this.props.ingridents} />
					<BuildControls
						isAuth={this.props.isAuthenticated}
						addIngrident={this.props.addIngrident}
						removeIngrident={this.props.removeIngrident}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasble={this.updatePurchasbleState(this.props.ingridents)}
						order={this.orderHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					price={this.props.totalPrice}
					ingridents={this.props.ingridents}
					cancelOrder={this.cancelOrderHandler}
					continueOrder={this.continueOrderHandler}
				/>
			);
		}

		return (
			<Aux>
				<Modal show={this.state.isOrdered} closeModal={this.cancelOrderHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingridents: state.burgerBuilder.ingridents,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngrident: (ingerident) => dispatch(Actions.addIngerident(ingerident)),
		removeIngrident: (ingerident) => dispatch(Actions.removeIngerident(ingerident)),
		initIngredients: () => dispatch(Actions.initIngredients()),
		purchaseOrderDone: () => dispatch(Actions.purchaseOrderDone()),
		onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
