import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';

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
          <button onClick={() => removeFromCart(book.isbn)}>Remove from Cart</button> :
          <button onClick={() => addToCart(book.isbn)}>Add to Cart</button>}
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