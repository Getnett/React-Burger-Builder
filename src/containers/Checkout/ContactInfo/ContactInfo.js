import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as Actions from '../../../store/actions/index';
import axios from '../../../axios-orders';
import classes from './ContactInfo.css';

class ContactInfo extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Your name',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				isValid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Enter Your email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: false,
				},
				isValid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Your street',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				isValid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Your zipcode',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				isValid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Your Country',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				isValid: false,
				touched: false,
			},
			deliveryFast: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'Fastest', displayValue: 'fastest' },
						{ value: 'Cheapest', displayValue: 'Fastest' },
					],
				},
				value: 'fastest',
				validation: {},
				isValid: true,
			},
		},

		formIsvalid: false,
	};

	checkValidity = (value, validation) => {
		let isValid = true;
		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}

		if (validation.maxLength) {
			isValid = value.length <= validation.maxLength && isValid;
		}
		if (validation.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	orderHandler = (event) => {
		event.preventDefault();

		let formData = {};
		for (let keys in this.state.orderForm) {
			formData[keys] = this.state.orderForm[keys].value;
		}

		const order = {
			ingridents: this.props.ingridents,
			orderData: formData,
			price: this.props.price,
			userId: this.props.userId,
		};

		this.props.sendPurchasOrder(order, this.props.token);
	};

	inputChangedHandler = (event, input) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[input] };

		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		let formIsvalid = true;
		updatedOrderForm[input] = updatedFormElement;

		for (let inputs in updatedOrderForm) {
			formIsvalid = updatedOrderForm[inputs].isValid && formIsvalid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsvalid });
	};

	render() {
		let formElements = [];
		for (let keys in this.state.orderForm) {
			formElements.push({
				id: keys,
				config: this.state.orderForm[keys],
			});
		}
		let form = (
			<form action="" className={classes.Form} onSubmit={this.orderHandler}>
				{formElements.map((formElement) => {
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
				})}

				<Button btnType="Success" disabled={!this.state.formIsvalid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactInfo}>
				<h1>Enter your contact information here in the fildes</h1>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingridents: state.burgerBuilder.ingridents,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToprops = (dispatch) => {
	return {
		sendPurchasOrder: (orderData, token) => dispatch(Actions.sendPurchaseOrderData(orderData, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToprops)(withErrorHandler(ContactInfo, axios));
