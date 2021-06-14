import React, { Component } from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.show !== nextProps.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} cancel={this.props.closeModal} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
