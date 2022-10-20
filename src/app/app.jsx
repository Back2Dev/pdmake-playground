import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { EditorProvider } from "../components/provider";
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
