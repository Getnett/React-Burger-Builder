import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/logout/Logout';
import LazyLoader from './hoc/LazyLoading';
import * as Actions from './store/actions/index';

const AuthPage = LazyLoader(() => {
	return import('./containers/Auth/Auth');
});
const CheckOutPage = LazyLoader(() => {
	return import('./containers/Checkout/CheckOut');
});

const OrdersPage = LazyLoader(() => {
	return import('./containers/Orders/Orders');
});

class App extends Component {
	componentDidMount() {
		this.props.onRefershSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={AuthPage} />
				<Route path="/" exact component={BurgerBuider} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={CheckOutPage} />
					<Route path="/orders" component={OrdersPage} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={AuthPage} />
					<Route path="/" exact component={BurgerBuider} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return <Layout>{routes}</Layout>;
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onRefershSignIn: () => dispatch(Actions.authCheckState()),
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
