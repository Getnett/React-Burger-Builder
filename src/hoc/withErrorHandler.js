import React, { Component } from "react";

import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      console.log(
        "[componentWillUnmount]",
        this.reqInterceptors,
        this.resInterceptors
      );
      axios.interceptors.response.eject(this.reqInterceptors);
      axios.interceptors.request.eject(this.resInterceptors);
    }

    cancelErrorHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} closeModal={this.cancelErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
export default withErrorHandler;
