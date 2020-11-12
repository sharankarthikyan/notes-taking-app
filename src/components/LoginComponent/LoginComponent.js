import React, { Component } from "react";
import fire from "../../fire";
import "./LoginComponent.css";
import LogMenuComponent from "../LogMenuComponent/LogMenuComponent";

class LoginComponent extends Component {
  state = {
    user: "",
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    hasAccount: false,
  };

  clearInputs = () => {
    this.setState({ email: "" });
    this.setState({ password: "" });
  };

  clearErrors = () => {
    this.setState({ emailError: "" });
    this.setState({ passwordError: "" });
  };

  loginHandler = (e) => {
    e.preventDefault();
    this.clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({ hasAccount: true });
        window.location.href = "/home";
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            this.setState({ emailError: err.message });
            break;
          case "auth/wrong-password":
            this.setState({ passwordError: err.message });
            break;
          default:
        }
      });
  };

  render() {
    return (
      <div>
        <LogMenuComponent />
        <div className="login-component">
          <div className="border">
            <form className="form">
              <h3>Log in</h3>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control col-sm-12"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
                <p className="errMsg">{this.state.emailError}</p>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <p className="errMsg">{this.state.passwordError}</p>
                <button
                  onClick={this.loginHandler}
                  className="btn btn-success btn-lg btn-block"
                >
                  Sign in
                </button>
              </div>
              <p>
                New to Double Star! <a href="/signup">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
