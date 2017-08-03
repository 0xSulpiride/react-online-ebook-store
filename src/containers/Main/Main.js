import React, { Component } from 'react';
import Shop from '../Shop';
import * as actions from '../../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'semantic-ui-react';
import { fetchCart } from '../../actions/cart';

class Main extends Component {
  componentDidMount() {
    this.props.search('');
  }
  render() {
    return (
      <div id="Main">
        <Input size='big' icon='search' placeholder='Search...' onChange={e => this.props.search(e.target.value)} />
        <Shop />
      </div>
    );
  }
}

function mapState(state) {
  return {
    shop: state.shop,
    cart: state.cart,
    authenticated: state.auth.authenticated
  }
}

function mapDispatch(dispatch) {
  return {
    search: bindActionCreators(actions.shop.search, dispatch),
    fetchCart: bindActionCreators(fetchCart, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Main);
