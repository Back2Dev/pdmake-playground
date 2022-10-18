import Header from "./header";
import CodeEditor from "./code-editor";
import Footer from "./footer";
import { EditorProvider, GlobalStateProvider } from "./provider";

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
