import Header from "./header";
import CodeEditor from "./code-editor";
import Footer from "./footer";
import { EditorProvider } from "./provider";

const App = () => {
  return (
    <>
      <EditorProvider>
        <Header />
        <CodeEditor />
      </EditorProvider>
      <Footer />
    </>
  );
};

export default App;
