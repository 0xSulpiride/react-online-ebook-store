import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Message } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form';
import * as authActions from '../../actions/auth';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }

  return errors;
};


class SignUp extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.render = this.render.bind(this);
  }
  handleFormSubmit(values) {
    this.props.signUpUser(values);
  };

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <Form.Field>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <Message negative>{error}</Message>}
        </div>
      </Form.Field>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Field name="email" type="text" component={this.renderField} label="Email" />
        <Field name="password" type="password" component={this.renderField} label="Password" />
        <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />
        <Button type='submit'>Sign Up</Button>
      </Form>
    );
  }
}

export default connect(null, (dispatch) => ({
  signUpUser: bindActionCreators(authActions.register, dispatch)
}))(reduxForm({
  form: 'signup',
  validate
})(SignUp));
