import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as Actions from '../../store/actions/index';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Enter Your email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				isValid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Enter Your password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				isValid: false,
				touched: false,
			},
		},
		isSignup: true,
	};
	checkValidity = (value, validation) => {
		let isValid = true;
		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}
		if (validation.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (event, input) => {
		const updatedControls = {
			...this.state.controls,
			[input]: {
				...this.state.controls[input],
				value: event.target.value,
				isValid: this.checkValidity(event.target.value, this.state.controls[input].validation),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	authSwitchHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	};

	componentDidMount() {
		if (!this.props.burgerBuilding && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	render() {
		let formElements = [];
		for (let keys in this.state.controls) {
			formElements.push({
				id: keys,
				config: this.state.controls[keys],
			});
		}
		let form = formElements.map((formElement) => {
			return (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.isValid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}
				/>
			);
		});

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}
		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className={classes.Auth}>
				{errorMessage}
				{authRedirect}
				<form action="" onSubmit={this.submitHandler}>
					{form}
					<Button type="submit" btnType="Success">
						{' '}
						Submit{' '}
					</Button>
				</form>
				<Button type="button" clicked={this.authSwitchHandler} btnType="Danger">
					SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		burgerBuilding: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) => dispatch(Actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(Actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
