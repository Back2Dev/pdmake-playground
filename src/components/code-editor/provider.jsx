import React from "react";

const EditorContext = React.createContext("editor");
export default EditorContext;

// Reducer Function
function editorReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setCode":
      return {
        ...state,
        code: payload,
        dirty: true,
      };
    case "setFilename":
      return {
        ...state,
        filename: payload,
      };
    case "setDarkTheme":
      return {
        ...state,
        darktheme: payload,
      };
    case "setCmeditor":
      return {
        ...state,
        cmeditor: payload,
      };
    case "setDirty":
      return {
        ...state,
        dirty: payload,
      };
    case "setErr":
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
}

// Provider
export const EditorProvider = ({ children, source }) => {
  const [state, dispatch] = React.useReducer(editorReducer, {
    code: source || 'dd = {content: "Hello "}',
    filename: "New File",
    darktheme: false,
    cmeditor: true,
    dirty: false,
    err: source || ""
  });
  const setCode = (data) => {
    dispatch({ type: "setCode", payload: data });
  };
  const setFilename = (data) => {
    dispatch({ type: "setFilename", payload: data });
  };
  const setDarkTheme = (data) => {
    dispatch({ type: "setDarkTheme", payload: data });
  };
  const setCmeditor = (data) => {
    dispatch({ type: "setCmeditor", payload: data });
  };
  const setDirty = (data) => {
    dispatch({ type: "setDirty", payload: data });
  };
  const setErr = (data) => {
    dispatch({ type: "setErr", payload: data });
  }
  return (
    <EditorContext.Provider
      value={{
        ...state,
        setCode,
        setFilename,
        setCmeditor,
        setDarkTheme,
        setDirty,
        setErr
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
