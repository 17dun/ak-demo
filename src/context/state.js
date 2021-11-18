import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';

const AppContext = createContext();

const initState = {
  logoProps: {}
};

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
