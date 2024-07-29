import axios from 'axios'
import { server } from '../store'


export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:'loginRequest'})
        const {data}=await axios.post(`${server}/login`,
        {email,password},
        {header:{
            'Content-type':'application/json'
        },
    withCredentials:true,
    }
        )
        dispatch({type:'loginSuccess',payload:data})
    } catch (error) {
        dispatch({type:'loginFail',payload:error.response.data.message})
    }
}

export const register = (name,email,password)=> async (dispatch) => {
    try {
      dispatch({ type: 'registerRequest' });
      const payload = { name, email, password };
      const { data } = await axios.post(`${server}/register`, payload, {
        headers: {
          'Content-type': 'application/json',
        },  
        withCredentials: true,
      });
      dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
      dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
  };


export const getAllUsers = () => async dispatch => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: 'allUserRequest' }); 
      const { data } = await axios.get(`${server}/users`, config);
      dispatch({ type: 'allUserSuccess', payload: data.users });
    } catch (error) {
      dispatch({
        type: 'allUserFail',
        payload: error.response.data.message,
      });
    }
  };


export const loadUser = () => async dispatch => {
    try {
      dispatch({ type: 'loadUserRequest' });  
      const { data } = await axios.get(
        `${server}/me`,  
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'loadUserSuccess', payload: data.user });
    } catch (error) {
      dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
  };  

  
export const logout = () => async dispatch => {
    try {
      dispatch({ type: 'logoutRequest' });
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
  };


export const buySubscription = () => async dispatch => {
    try {
      dispatch({ type: 'buySubscriptionRequest' });  
      const { data } = await axios.get(`${server}/subscribe`, {
        withCredentials: true,
      });
      dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
      dispatch({
        type: 'buySubscriptionFail',
        payload: error.response.data.message,
      });
    }
  };  