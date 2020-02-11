import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData);
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //redirect to the home page
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //redirect to the home page
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const setAuthorization = token => {
  const fBIdToken = `Bearer ${token}`;
  localStorage.setItem('fBIdToken', fBIdToken);
  //seting authorization to the header axios
  axios.defaults.headers.common['Authorization'] = fBIdToken;
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('fBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get('/user')
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};

//upload image
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};
