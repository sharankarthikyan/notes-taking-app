import React from "react";
import "./LoginComponent.css";

const LoginComponent = () => {
  return (
    <div>
      <div className="title">
        <h1 className="display-4" style={{ fontFamily: "Dancing Script" }}>
          Double Star
        </h1>
        <h4 style={{ fontFamily: "Satisfy" }}>Welcome</h4>
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

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-lg btn-block">
              Sign in
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
