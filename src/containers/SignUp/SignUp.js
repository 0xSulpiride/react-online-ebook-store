import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Message } from 'semantic-ui-react';
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
    this.renderField = this.renderField.bind(this);
    this.renderAuthenticationError = this.renderAuthenticationError.bind(this);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.signUpUser(this.props.credentials);
  };
  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return (
        <Message
          error
          header='There was some errors with your submission'
        >
          <p>{this.props.authenticationError}</p>
        </Message>
      );
    }
    return <div></div>;
  }

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
      <div>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        {this.renderAuthenticationError()}
        <Form onSubmit={this.handleFormSubmit}>
          <Field name="email" type="text" component={this.renderField} label="Email" />
          <Field name="password" type="password" component={this.renderField} label="Password" />
          <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />
          <Button basic color='blue' type='submit'>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

function mapState(state) {
  if (state.form.signup && state.form.signup.values) {
    return {
      credentials: {
        email: state.form.signup.values.email,
        password: state.form.signup.values.password,
      },
      authenticationError: state.auth.error
    }
  }
  return {
    credentials: {
      email: '',
      password: '',
    },
    authenticationError: state.auth.error
  };
}

export default connect(mapState, (dispatch) => ({
  signUpUser: bindActionCreators(authActions.register, dispatch)
}))(reduxForm({
  form: 'signup',
  validate
})(SignUp));
