import Header from "../components/header/header";
import CodeEditor from "../components/code-editor-old";
import Footer from "../components/footer/footer";
import { EditorProvider } from "../components/provider";
import New from "../new";
import Playground from "../playground/playground";

const App = () => {
  return (
    <>
      <EditorProvider>
        <Header />
        <Playground />
      </EditorProvider>
      <Footer />
    </>
  );
};

export default App;
