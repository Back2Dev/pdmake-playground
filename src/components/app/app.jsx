import "./App.css";
import Header from "../header/header";
import CodeEditor from "../code-editor/code-editor";
import Footer from "../footer/footer";
import { EditorProvider, GlobalStateProvider } from "../context/provider";

const App = () => {
  return (
    <>
      <EditorProvider>
        <GlobalStateProvider>
          <Header />
          <CodeEditor />
        </GlobalStateProvider>
      </EditorProvider>
      <Footer />
    </>
  );
};

export default App;
