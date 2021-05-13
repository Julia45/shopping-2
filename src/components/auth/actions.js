import axios from "axios"

export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_START = "AUTH_START"
export const AUTH_FAIL = "AUTH_FAIL"

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}

export const auth = (login, password) => {
  return dispatch => {
    return axios.get(`http://localhost:3001/auth?login=${login}&password=${password}`)
      .then((resp) => {
        if (resp.data.length > 0) {
          const user = resp.data[0]
          dispatch(authSuccess(user))
          return user
        } else {
          dispatch(authFail("Invalid username or password"))
          return null
        }
      })
  }
}