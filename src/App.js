import { useRef } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";
import { useSnapshot } from "valtio";
import { state } from "./utils/state";

function App() {
  const header = useRef(null);
  const snap = useSnapshot(state);
  document.addEventListener('gesturestart', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gesturechange', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gestureend', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });

  return (
    <div className="App">
      <Header header={header} />
      <Routes>
        <Route path="/" element={<Page content={"home"} header={header} />} />
        <Route path="/shop" element={<Page content={"shop"} header={header} />} />
        <Route path="/dashboard" element={<Page content={"dashboard"} header={header} />} />
        <Route path="/home" element={<Page content={"home"} header={header} />} />
        {snap.data.map((value, index) => (
          <Route path={`/${value.id}`} key={index} element={<Page content={value} header={header} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
