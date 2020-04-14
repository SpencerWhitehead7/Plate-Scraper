import axios from 'axios'

const A = {
  GET: `auth/GET_USER`,
  REMOVE: `auth/REMOVE_USER`,
  SIGNUP_ERROR: `auth/SIGNUP_ERROR`,
  LOGIN_ERROR: `auth/LOGIN_ERROR`,
}

const getUser = user => ({ type: A.GET, user })
const removeUser = () => ({ type: A.REMOVE })
const signupError = err => ({ type: A.SIGNUP_ERROR, err })
const loginError = err => ({ type: A.LOGIN_ERROR, err })

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get(`/auth/me`)
    const user = data || {}
    dispatch(getUser(user))
  } catch (err) {
    console.log(err)
  }
}

export const signup = (email, userName, password) => async dispatch => {
  try {
    const { data } = await axios.post(`/auth/signup`, { email, userName, password })
    dispatch(getUser(data))
  } catch (err) {
    dispatch(signupError(err.response))
    console.log(err)
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const { data } = await axios.post(`/auth/login`, { email, password })
    dispatch(getUser(data))
  } catch (err) {
    dispatch(loginError(err.response))
    console.log(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post(`/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.log(err)
  }
}

const initialState = {
  user: {},
  signupError: {},
  loginError: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case A.GET:
      return {
        ...state,
        user: action.user,
        signupError: {},
        loginError: {},
      }
    case A.REMOVE:
      return initialState
    case A.SIGNUP_ERROR:
      return { ...state, signupError: action.err }
    case A.LOGIN_ERROR:
      return { ...state, loginError: action.err }
    default:
      return state
  }
}

export default reducer