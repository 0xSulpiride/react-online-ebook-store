import React, { Component } from 'react';
import Shop from '../Shop';
import * as actions from '../../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div id="App">
        <Input size='big' icon='search' placeholder='Search...' onChange={e => this.props.search(e.target.value)} />
        <Shop />
      </div>
    );
  }
}

function mapState(state) {
  return {
    shop: state.shop,
    cart: state.cart
  }
}

function mapDispatch(dispatch) {
  return {
    search: bindActionCreators(actions.shop.search, dispatch),
  }
}

export default connect(mapState, mapDispatch)(App);
