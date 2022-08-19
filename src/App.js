import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import Page from "./components/Page";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Page content={null} />} />
        <Route path="/contact" element={<Page content={"contact"} />} />
      </Routes>
      <Header />
    </div>
  );
}

export default App;
