import { createContext, ReactNode, useEffect, useReducer } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { auth } from '../lib/auth';

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isLoading: true
};

enum ActionType {
  INITIALIZED = 'initialized',
  SIGNED_IN = 'signedIn',
  SIGNED_OUT = 'signedOut'
}

type ActionInitialized = { type: ActionType.INITIALIZED; payload: boolean; };
type ActionSignedIn = { type: ActionType.SIGNED_IN };
type ActionSignedOut = { type: ActionType.SIGNED_OUT };

type Action =
  | ActionInitialized
  | ActionSignedIn
  | ActionSignedOut;

// Faster than using switch version
const handlers = {
  [ActionType.INITIALIZED]: (state: State, action: ActionInitialized) => {
    return {
      ...state,
      isAuthenticated: action.payload,
      isLoading: false
    };
  },
  [ActionType.SIGNED_IN]: (state: State, _: ActionSignedIn) => {
    return {
      ...state,
      isAuthenticated: true
    };
  },
  [ActionType.SIGNED_OUT]: (state: State, _: ActionSignedOut) => {
    return {
      ...state,
      isAuthenticated: false
    };
  }
};

const reducer = (state: State, action: Action): State => (
  // @ts-ignore
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = () => {
    auth
      .getCurrentUser()
      .then((user: any) => {
        dispatch({
          type: ActionType.INITIALIZED,
          payload: !!user
        });
      })
      .catch((err: any) => {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZED,
          payload: false
        });
      });
  };

  const onSignedIn = () => {
    dispatch({
      type: ActionType.SIGNED_IN
    });

    Router.push('/dashboard').catch(console.error);
  };

  const onSignedOut = () => {
    dispatch({
      type: ActionType.SIGNED_OUT
    });

    Router.push('/').catch(console.error);
  };

  useEffect(() => {
    initialize();

    // Auth library emits signed-in and signed-out events. We use this functionality to redirect
    // the user accordingly.

    auth.emitter.addEventListener('signedIn', onSignedIn);
    auth.emitter.addEventListener('signedOut', onSignedOut);

    return () => {
      auth.emitter.removeEventListener('signedIn', onSignedOut);
      auth.emitter.removeEventListener('signedOut', onSignedOut);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;