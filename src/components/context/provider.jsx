import React from "react";

const defaultGlobalState = {
  filename: "basics",
  filebody:
    "dd={content: ['First paragraph','Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines']}",
};

export const globalStateContext = React.createContext(defaultGlobalState);

// set reducer for global state
export const GlobalStateProvider = ({ children }) => {
  const state = React.useReducer((state, newValue) => ({
    ...state,
    ...newValue,
  }));
  return (
    <globalStateContext.Provider value={state}>
      {children}
    </globalStateContext.Provider>
  );
};
