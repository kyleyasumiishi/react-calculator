import React, { Component } from "react";
import Display from "../components/Display";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import actions

export class DisplayContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Display
        className="display-container"
        id="display"
        display={this.props.currentExpression}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentExpression: state.currentExpression
  };
}

// function mapDispatchToProps(dispatch) {
//   return ();
// }

export default connect(
  mapStateToProps,
  null
)(DisplayContainer);
