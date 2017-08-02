import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { add, remove } from '../../actions/cart';
import { Link } from 'react-router-dom';

class Shop extends Component {
  render() {
    const {shop} = this.props;
    return (
      <div id="shop">
        <ul>
          {shop.map(b =>
            <li key={b.isbn}>
              <Link to={`/book/${b.isbn}`}>{b.author} - {b.name} - </Link>
              {b.inCart ?
                <button onClick={() => this.props.removeFromCart(b.isbn)}>
                  Remove from cart
                </button> :
                <button onClick={() => this.props.addToCart(b.isbn)}>
                  Add to cart
              </button>
              }
            </li>)}
        </ul>
      </div>
    );
  }
}

function mapState(state) {
  const shop = state.shop.map(b => {
    return state.cart.indexOf(b.isbn) > -1 ?
      { ...b, inCart: true } :
      { ...b, inCart: false }
  });

  return {
    shop
  }
}

function mapDispatch(dispatch) {
  return {
    addToCart: bindActionCreators(add, dispatch),
    removeFromCart: bindActionCreators(remove, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Shop);