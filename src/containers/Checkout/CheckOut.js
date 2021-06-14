import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class CheckOut extends Component {
	cancelCheckoutHandler = () => {
		this.props.history.goBack();
	};
	continueCheckoutHandler = () => {
		this.props.history.replace('/checkout/contact-info');
	};
	render() {
		let summary = <Redirect to="/" />;

		if (this.props.ingridents) {
			summary = (
				<div>
					<CheckoutSummary
						ingridents={this.props.ingridents}
						cancelledChekout={this.cancelCheckoutHandler}
						contiunedCheckout={this.continueCheckoutHandler}
					/>

					<Route path={this.props.match.path + '/contact-info'} component={ContactInfo} />
				</div>
			);
			if (this.props.purchased) {
				summary = <Redirect to="/" />;
			}
		}
		return summary;
	}
}
const mapStateToProps = (state) => {
	return {
		ingridents: state.burgerBuilder.ingridents,
		totalPrice: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(CheckOut);
