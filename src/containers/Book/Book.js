import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
import { List, Image, Button, Icon } from 'semantic-ui-react'

class Book extends Component {
  render() {
    const { book, incart, addToCart, removeFromCart } = this.props;
    return (
      <div>
        <h3>author: </h3>{book.author},
        <h3>name: </h3>{book.name}
        <h4>isbn: </h4>{book.isbn}
        <br />
        {incart ?
          <Button
            negative
            onClick={() => removeFromCart(book.isbn)}
          >
            <Button.Content><Icon name='trash outline' /> Remove from Cart</Button.Content>
          </Button> :
          <Button
            primary
            onClick={() => addToCart(book.isbn)}
            animated
          >
            <Button.Content visible><Icon name='trash outline' /> Add to Cart</Button.Content>
            <Button.Content hidden>
              $0.99 ebook (fb2)
                    </Button.Content>
          </Button>}
      </div>
    );
  }
}

function mapState(state, ownProps) {
  const book = state.shop.filter(b => b.isbn === ownProps.isbn)[0];
  const incart = state.cart.indexOf(ownProps.isbn) > -1;
  return {
    book,
    incart
  }
}

function mapDispatch(dispatch) {
  return {
    addToCart: bindActionCreators(cartActions.add, dispatch),
    removeFromCart: bindActionCreators(cartActions.remove, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Book);