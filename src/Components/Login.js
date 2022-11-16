import React from "react";
import { useState, useEffect } from "react";
// import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  <p className="forgot-password text-right">
    Already registered <a href="/sign-in">sign in?</a>
  </p>;
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    axios
      .get("https://lq-time-tracking.firebaseio.com/user.json")
      .then(function (response) {
        setFormErrors(response.formErrors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!values.username) {
    //   errors.username = "Username is required!";
    // }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than  characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 6 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          _ <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
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
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
          <p className="forgot-password text-right">
            Already registered <Link to={"/sign-up"}>Sign-up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
