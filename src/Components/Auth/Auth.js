import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Auth.scss';

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="Auth">
        <h1 className="loginAuth">GreenUp</h1>
        <h3 className="taglineAuth">make your life a little greener</h3>
        <form className="col-10 col-lg-4 container sign-in-form" onSubmit={this.loginClickEvent}>
          {/* <h3 className="sign-in-header">Already Have An Account?</h3> */}
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={this.handleChange}
              placeholder="JohnDoe@greenup.com"
              required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={this.handleChange}
              placeholder="*****"
              required
              />
            </div>
            <button className="btn btn-success">Log In</button>
            <Link className="btn btn-info col-8" to={'/new-user'}>Create an Account!</Link>
          </form>
      </div>
    );
  }
}

export default Auth;
