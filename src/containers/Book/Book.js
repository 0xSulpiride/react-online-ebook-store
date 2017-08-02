import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';

class Book extends Component {
  render() {
    const { book } = this.props;
    return (
      <div>
        <h3>author: </h3>{book.author},
        <h3>name: </h3>{book.name}
        <h4>isbn: </h4>{book.isbn}
      </div>
    );
  }
}

function mapState(state, ownProps) {
  const book = state.shop.filter(b => b.isbn === ownProps.isbn)[0];
  return {
    book
  }
}

function mapDispatch(dispatch) {
  return {
    addToCart: bindActionCreators(cartActions.add, dispatch),
    removeFromCart: bindActionCreators(cartActions.remove, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Book);