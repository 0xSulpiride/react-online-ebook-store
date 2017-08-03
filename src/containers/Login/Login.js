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

  return errors;
};

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAuthenticationError = this.renderAuthenticationError.bind(this);
    this.renderField = this.renderField.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.props.credentials);
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
  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {this.renderAuthenticationError()}
        <Form onSubmit={this.handleSubmit}>
          <Field name="email" component={this.renderField} type="text" label="Email" />
          <Field name="password" component={this.renderField} type="password" label="Password" />
          <Button basic color='green' type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

function mapState(state) {
  if (state.form.login && state.form.login.values) {
    return {
      credentials: {
        email: state.form.login.values.email,
        password: state.form.login.values.password,
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
  login: bindActionCreators(authActions.login, dispatch)
}))(reduxForm({
  form: 'login',
  validate
})(Login));