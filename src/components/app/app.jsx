import { useState } from "react";
import React from "react";
import "./App.css";
import Header from "../header/header";
import CodeEditor from "../code-editor/code-editor";
import Footer from "../footer/footer";
import { GlobalStateProvider } from "../context/provider";

const App = () => {
  return (
    <>
      <GlobalStateProvider>
        <Header />
        <CodeEditor />
      </GlobalStateProvider>

      <Footer />
    </>
  );
};

export default App;
