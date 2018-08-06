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
        display={this.props.current}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.current
  };
}

// function mapDispatchToProps(dispatch) {
//   return ();
// }

export default connect(
  mapStateToProps,
  null
)(DisplayContainer);
