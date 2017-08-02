import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    const {cart} = this.props;

    if (!cart.length)
      return (
        <div>
          <h2>Your cart is empty.</h2>
        </div>
      );

    return (
      <div>
        <h2>Cart</h2>
        <ul>
          {cart.map(b =>
            <li key={b.isbn}>
              <Link to={`/book/${b.isbn}`}>{b.author} - {b.name} - </Link>
              <button onClick={() => this.props.removeFromCart(b.isbn)}>
                Remove from cart
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapState(state) {
  const cart = state.shop.filter(b => state.cart.indexOf(b.isbn) > -1);
  return {
    cart
  }
}

function mapDispatch(dispatch) {
  return {
    removeFromCart: bindActionCreators(cartActions.remove, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Cart);