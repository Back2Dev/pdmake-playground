import React from "react"

const defaultGlobalState = {
  filename : "basics",
  filebody : "dd={content: ['First paragraph','Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines']}"
}

export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);



// set reducer for global state
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultGlobalState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

