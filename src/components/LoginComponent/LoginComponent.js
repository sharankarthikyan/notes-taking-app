import React, { useState } from "react";

import fire from "../../fire";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");

  const loginHandler = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <div>
      <div className="title">
        <h1 className="display-4" style={{ fontFamily: "Satisfy" }}>
          Welcome
        </h1>
      </div>
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
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-success btn-lg btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
