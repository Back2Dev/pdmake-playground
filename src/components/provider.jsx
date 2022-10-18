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
      };
    case "setFilename":
      return {
        ...state,
        filename: payload,
      };
    default:
      return state;
  }
}

// Provider
export const EditorProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(editorReducer, {
    code: 'dd = {content: "Hello "}',
    filename: "New",
  });
  const setCode = (data) => {
    dispatch({ type: "setCode", payload: data });
  };
  const setFilename = (data) => {
    dispatch({ type: "setFilename", payload: data });
  };
  return (
    <EditorContext.Provider value={{ ...state, setCode, setFilename }}>
      {children}
    </EditorContext.Provider>
  );
};
