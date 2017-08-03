import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
import * as shopActions from '../../actions/shop';
import {
  Button,
  Icon,
  Breadcrumb,
  Card,
  Item,
  Grid,
  Rating
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Book extends Component {
  render() {
    const { book, 
      incart, 
      addToCart, 
      removeFromCart, 
      avatar, 
      bio, 
      date, 
      description,
      rate } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={16}>
            <Breadcrumb size="large">
              <Breadcrumb.Divider />
              <Breadcrumb.Section link as={Link} to='/'>Books</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{book.author} - {book.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card
              image={avatar}
              header={book.author}
              description={bio}
              extra={date}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Item.Group divided>
              <Item>
                <Item.Content>
                  <Item.Header>{book.name}</Item.Header>
                  <Item.Meta>
                    <Rating 
                      icon='heart' 
                      defaultRating={book.rating} 
                      maxRating={5} 
                      onRate={(e, {rating}) => rate(book.isbn, rating)}/>
                  </Item.Meta>
                  <Item.Description>
                    {description}
                  </Item.Description>
                  <Item.Extra>
                    {incart ?
                      <Button
                        negative
                        onClick={() => removeFromCart(book.isbn)}
                        floated='bottom right'
                      >
                        <Button.Content><Icon name='trash outline' /> Remove from Cart</Button.Content>
                      </Button> :
                      <Button
                        primary
                        onClick={() => addToCart(book.isbn)}
                        animated
                        floated='right'
                      >
                        <Button.Content visible><Icon name='shop' /> Add to Cart</Button.Content>
                        <Button.Content hidden>
                          $0.99 ebook (fb2)
                        </Button.Content>
                      </Button>
                    }
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapState(state, ownProps) {
  const book = state.shop.filter(b => b.isbn === ownProps.isbn)[0];
  const incart = state.cart.indexOf(ownProps.isbn) > -1;
  const avatar = state.avatar[book.author];
  const {bio, date} = state.author[book.author];
  const description = state.description[book.name];
  return {
    book,
    incart,
    avatar,
    bio,
    date,
    description
  }
}

function mapDispatch(dispatch) {
  return {
    addToCart: bindActionCreators(cartActions.add, dispatch),
    removeFromCart: bindActionCreators(cartActions.remove, dispatch),
    rate: bindActionCreators(shopActions.rate, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Book);