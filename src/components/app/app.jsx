import { useState } from "react";
import "./App.css";
import Header from "../header/header";
import Mainbody from "../mainbody/mainbody";
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
