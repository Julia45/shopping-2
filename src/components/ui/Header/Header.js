import React, { useState } from "react"
import logo from "../../../public/logo1.jpg"
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { authSuccess } from "../../auth/actions"
import { useLocation } from 'react-router-dom'


const Header = (props) => {
  const history = useHistory();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("visitor")
    history.push("/login");
  }

  let user = props.user ? props.user.login : ""

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logo} alt="logo" style={{ width: "80px" }}></img>
        </a>
        {
          location.pathname !== "/login" && <form className="d-flex align-items-center">
            <div style={{ marginRight: "20px" }}>Hello <strong>{user}</strong></div>
            <button className="btn btn-outline-primary" onClick={logoutHandler}>Logout</button>
          </form>
        }
      </div>
    </nav>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (authData) => dispatch(authSuccess(authData))
  }
}

const mapStateToProp = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(Header);

