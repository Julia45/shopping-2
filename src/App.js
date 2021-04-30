import Form from "./components/Form"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "./App.css"
import Header from "./components/ui/Header/Header"
import ProductDetails from "./components/ProductDetailsPage/ProductDetails"
import ProductEdit from "./components/ProductEditPage/ProductEdit"
import ProductAdd from "./components/ProductAddPage/ProductAdd"
import { useEffect } from "react";
import { connect } from 'react-redux'
import { authSuccess } from "./components/auth/actions"
import NotFoundPage from "./components/ErrorPages/NotFound"
import ServerError from "./components/ErrorPages/ServerError"
import ProductsPage from "./components/ProductsPage/ProductsPage"
import { useHistory } from "react-router-dom";

function App(props) {
  let history = useHistory();
  useEffect(() => {
    let user = null

    try {
      user = JSON.parse(localStorage.getItem("visitor"))
      props.authSuccess(user)
    } catch (e) {
      console.log('Failed to get user from localstorage')
    }

    if (!user) {
      history.push("/login")
    } else {
      history.push("/")
    }
  }, [])


  return (
    <>
      <Header></Header>
      <Switch>
      <Route path="/" exact component={ProductsPage}></Route>
      <Route path="/login" exact component={Form}></Route>
      <Route path="/details/:id" exact component={ProductDetails}></Route>
      <Route path="/edit/:id" exact component={ProductEdit}></Route>
      <Route path="/new" exact component={ProductAdd}></Route>
      <Route path="/500" exact component={ServerError}></Route>
      <Route component={NotFoundPage}></Route>
      </Switch>
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (authData) => dispatch(authSuccess(authData))
  }
}


export default connect(null, mapDispatchToProps)(App);

