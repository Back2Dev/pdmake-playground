import Header from "../header/header";
import Footer from "../footer/footer";
import { EditorProvider } from "../components/provider";
import Playground from "../components/index";

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
