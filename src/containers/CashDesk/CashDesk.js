import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class CashDesk extends Component {
  render() {
    return (
      <div>
        <h1>Sorry, unfortunately this function isn't available in your country.</h1>
      </div>
    );
  }
}

function mapState(state) {
  return {

  }
}

function mapDispatch(dispatch) {
  return {

  }
}

export default connect(mapState, mapDispatch)(CashDesk);