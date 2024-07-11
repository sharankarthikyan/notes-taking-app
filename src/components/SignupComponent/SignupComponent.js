import React, { Component } from "react";
import "./SignupComponent.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LogMenuComponent from "../LogMenuComponent/LogMenuComponent";
import { Link } from "react-router-dom";

class SignupComponent extends Component {
  state = {
    user: "",
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    successMsg: "",
    hasAccount: false,
  };

  clearErrors = () => {
    this.setState({ emailError: "" });
    this.setState({ passwordError: "" });
  };

  clearInputs = () => {
    this.setState({ email: "", password: "", user: "" });
  };

  signupHandler = (e) => {
    e.preventDefault();
    this.clearErrors();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        this.setState({ successMsg: "Account Created Successfully" });
        this.clearInputs();
        // Redirect or navigate to '/home'
        window.location.href = "/home";
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            this.setState({ emailError: err.message });
            break;
          case "auth/weak-password":
            this.setState({ passwordError: err.message });
            break;
          default:
            console.error("Error signing up:", err);
        }
      });
  };

  render() {
    return (
      <div>
        <LogMenuComponent />
        <div className="signup-component">
          <div className="border-signup">
            <form className="form">
              <h3>Sign up</h3>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control col-sm-12"
                  placeholder="Enter name"
                  value={this.state.user}
                  onChange={(e) => this.setState({ user: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control col-sm-12"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
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
              </div>
              <button
                type="submit"
                onClick={this.signupHandler}
                className="btn btn-primary btn-lg btn-block"
              >
                Sign up
              </button>
              <p className="successMsg">{this.state.successMsg}</p>
              <p>
                Already have an account! <Link to="/">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupComponent;
