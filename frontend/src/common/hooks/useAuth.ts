// useAuth.ts
import { useEffect, useState } from 'react';
import { LoginRequest, logoutRequest } from "../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { FormValues } from '../../pages/Signin';


export const useAuth = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  
 
  
  useEffect(() => {
    // Check if the token exists in local storage to determine if the user is logged in
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      
    } else {
        setIsLoggedIn(false);
        
    }
  }, [isLoggedIn]);

  const login = (data: FormValues) => {
    dispatch(LoginRequest(data))


  };
  
  const logout = () => {
    // Clear token from local storage upon logging out
    localStorage.removeItem('token');
    dispatch(logoutRequest());

    // another way
    // dispatch({type:"LOGOUT"})
    
  };

  return {
    isLoggedIn,
    login,
    logout
  };
};
