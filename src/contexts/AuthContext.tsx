import { getMe } from '@/services/user';
import { getAsyncStorage, setAsyncStorage } from '@/utils/AsyncStorage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AuthActionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  INITIALIZE: 'INITIALIZE',
  VALIDATE_TOKEN: 'VALIDATE_TOKEN',
};

const AuthContext = createContext(undefined);

function authReducer(state, action) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        accessToken: null,
      };
    case AuthActionTypes.INITIALIZE:
    case AuthActionTypes.VALIDATE_TOKEN:
      return {
        ...state,
        isAuthenticated: !!action.payload.accessToken,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    userId: null,
    accessToken: null,
  });

  useEffect(() => {
    async function initializeAuth() {
      const accessToken = await getAsyncStorage({ key: 'accessToken' });
      if (accessToken) {
        try {
          const userData = await getMe(accessToken);
          dispatch({
            type: AuthActionTypes.VALIDATE_TOKEN,
            payload: {
              accessToken,
              userId: userData.id,
            },
          });
        } catch (error) {
          console.error('Token validation error:', error);
          dispatch({
            type: AuthActionTypes.LOGOUT,
          });
        }
      }
    }
    initializeAuth();
  }, []);

  useEffect(() => {
    const accessToken = { value: state.accessToken, key: 'accessToken' };
    if (state.accessToken) {
      setAsyncStorage(accessToken);
    } else {
      setAsyncStorage({ key: 'accessToken', value: null });
    }
  }, [state.accessToken]);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export { AuthActionTypes };
