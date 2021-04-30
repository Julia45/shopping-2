import { AUTH_SUCCESS, AUTH_FAIL } from "./actions"


const initialState = {
  user: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, user: action.authData }
    case AUTH_FAIL:
      return { ...state, error: action.error }
    default:
      return state
  }
}

export default reducer