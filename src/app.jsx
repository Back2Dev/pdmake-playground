import Header from "./header/header";
import Footer from "./footer/footer";
import { EditorProvider } from "./components/code-editor/provider";
import Playground from "./components/code-editor";

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
