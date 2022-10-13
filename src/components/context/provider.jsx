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

// Another way to do this...
const EditorContext = React.createContext("editor");

export default EditorContext;

function editorReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setCode":
      return {
        ...state,
        code: payload,
      };
    default:
      return state;
  }
}

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(editorReducer, {
    code: 'dd = {content: "Hello "}',
  });
  const setCode = (data) => {
    dispatch({ type: "setCode", payload: data });
  };
  return (
    <EditorContext.Provider value={{ ...state, setCode }}>
      {children}
    </EditorContext.Provider>
  );
};
