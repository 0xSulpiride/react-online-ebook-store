import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
import { Link } from 'react-router-dom';
import { List, Image, Button, Icon } from 'semantic-ui-react'

class Cart extends Component {
  render() {
    const {cart, removeFromCart} = this.props;

    if (!cart.length)
      return (
        <div id="cart">
          <h2>Your cart is empty.</h2>
        </div>
      );

    return (
      <div id="cart">
        <h2>Cart</h2>
        <List divided verticalAlign='middle'>
          {cart.map(b =>
            <List.Item key={b.isbn}>
              <List.Content floated='right'>
                <Button
                  negative
                  onClick={() => removeFromCart(b.isbn)}
                >
                  <Icon name='trash outline' /> Remove from Cart
                </Button>
              </List.Content>
              <Image avatar src={b.avatar} />
              <List.Content as={Link} to={`/book/${b.isbn}`}>
                <List.Header>{b.author}</List.Header>
                <List.Description>{b.name}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}

function mapState(state) {
  const cart = state.shop
    .filter(b => state.cart.indexOf(b.isbn) > -1)
    .map(b => {
      b.avatar = state.avatar[b.author];
      return b;
    });
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