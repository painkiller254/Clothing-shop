import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../../auth/helper";
import "./auth.css"

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { name, email, password, error, success, loading, didRedirect } =
    values;

  const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

  const onSumit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          //let sessionToken = data.token;
          authenticate(data, () => {
            console.log("TOKKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please <Link
              to="/signin"
            >
              login now.
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                name="email"
                className="signup--btn"
                id="em"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>&nbsp;
              <input
                name="password"
                className="signup--btn"
                id="em"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button
              onClick={onSumit}
              className="auth--sub"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="auth">
        <h1>Sign In</h1>
        <p>Not a member yet? <Link to="/signup">Sign Up</Link></p>
      {loadingMessage()}

      {signInForm()}
      {/* // <p className="text-center">
      //   {JSON.stringify(values)}
      // </p> */}
      {performRedirect()}
    </div>
  );
};


export default Signin