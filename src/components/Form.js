import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../components/auth/actions";
import logo from "../public/logo1.jpg";
import "./Form.css";

const Form = (props) => {
  let history = useHistory();
  const [values, setValues] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState({
    login: undefined,
    password: undefined,
  });
  const [loginError, setLoginError] = useState("");

  const loginValidation = () => {
    const nextLoginError =
      values.login.length <= 0
        ? "Login is required"
        : values.login.length <= 3
        ? "Login must be > 3"
        : /[A-Za-z]/.test(values.login) !== true
        ? "Use English only"
        : "";
    return nextLoginError;
  };


  const passwordValidation = () => {
    const nextLoginError =
      values.password.length <= 0 ? "Password is required" : "";
    return nextLoginError;
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = await props.onAuth(values.login, values.password);
    if (!user) {
      setLoginError("No Such User");
    }
    if (user) {
      localStorage.setItem("visitor", JSON.stringify(user));
      history.push("/");
    }
  };

  let disabled =
    error.login === undefined ||
    error.login.length > 0 ||
    error.password === undefined ||
    error.password.length > 0;

  return (
    <form className="form" onSubmit={onSubmitHandler}>
     <img src={logo} alt="logo"></img>
      <div style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>
        {loginError}
      </div>
      <div className="input-group mb-1">
        <span className="input-group-text" id="basic-addon1">
          <i className="fas fa-user-shield"></i>
        </span>
        <input
          type="text"
          onBlur={(e) =>
            setError({ ...error, login: loginValidation(e.target.value) })
          }
          className="form-control"
          placeholder="Username"
          value={values.login}
          onChange={(e) => setValues({ ...values, login: e.target.value })}
        />
      </div>
      <div style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>
        {error.login}
      </div>
      <div className="input-group mb-1 ">
        <span className="input-group-text" id="basic-addon1">
          <i className="fas fa-unlock-alt"></i>
        </span>
        <input
          type="password"
          onBlur={(e) =>
            setError({ ...error, password: passwordValidation(e.target.value) })
          }
          className="form-control"
          placeholder="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
      </div>
      <div style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>
        {error.password}
      </div>
      <button disabled={disabled} className="btn btn-outline-primary">
        Login
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login, password) => dispatch(auth(login, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
