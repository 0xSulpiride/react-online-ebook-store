import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { add, remove, fetchCart } from '../../actions/cart';
import { Link } from 'react-router-dom';
import { List, Image, Button, Icon } from 'semantic-ui-react'

class Shop extends Component {
  render() {
    const {shop, removeFromCart, addToCart} = this.props;
    return (
      <div id="shop">
        <List divided verticalAlign='middle'>
          {shop.map(b =>
            <List.Item key={b.isbn}>
              <List.Content floated='right'>
                {b.inCart ?
                  <Button
                    negative
                    onClick={() => removeFromCart(b.isbn)}
                  >
                    <Button.Content><Icon name='trash outline' /> Remove from Cart</Button.Content>
                  </Button> :
                  <Button
                    primary
                    onClick={() => addToCart(b.isbn)}
                    animated
                  >
                    <Button.Content visible><Icon name='shop' /> Add to Cart</Button.Content>
                    <Button.Content hidden>
                      $0.99 ebook (fb2)
                    </Button.Content>
                  </Button>
                }
              </List.Content>
              <Image avatar src={b.avatar} />
              <List.Content as={Link} to={`/book/${b.isbn}`}>
                <List.Header>{b.author}</List.Header>
                <List.Description style={{ color: 'blue' }}>{b.name}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}

function mapState(state) {
  const shop = state.shop.map(b => {
    return state.cart.indexOf(b.isbn) > -1 ?
      { ...b, inCart: true } :
      { ...b, inCart: false }
  }).map(b => {
    b.avatar = state.avatar[b.author];
    return b;
  });

  return {
    shop
  }
}

function mapDispatch(dispatch) {
  return {
    addToCart: bindActionCreators(add, dispatch),
    removeFromCart: bindActionCreators(remove, dispatch),
    fetchCart: bindActionCreators(fetchCart, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Shop);