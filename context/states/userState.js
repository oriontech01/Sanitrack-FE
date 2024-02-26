import React, { Children, useReducer, useEffect } from 'react';
import UserReducer from './userReducer';
import { SET_USER } from '../types';
import { UserContext } from '../UserContext';

export default function UserState(props) {
  const initState = {
    name: '',
    role: '',
    id: '',
    role_id: '',
    token: '',
    email: '',
  };
  const [state, dispatch] = useReducer(UserReducer, initState);
  const setUser = (user) => dispatch({ type: SET_USER, payload: user });

  return (
    <UserContext.Provider
      value={{
        name: state.name,
        role: state.role,
        id: state.id,
        token: state.token,
        email: state.email,
        setUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
