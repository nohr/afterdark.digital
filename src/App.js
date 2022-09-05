import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Page content={null} />} />
        <Route path="/contact" element={<Page content={"contact"} />} />
      </Routes>
    </div>
  );
}

export default App;
