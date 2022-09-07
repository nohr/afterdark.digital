import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";
import { useSnapshot } from "valtio";
import { state } from "./utils/state";

function App() {
  const snap = useSnapshot(state);
  document.addEventListener('gesturestart', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gesturechange', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gestureend', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Page content={"home"} />} />
        {snap.data.map((value, index) => (
          <Route path={`/${value.id}`} key={index} element={<Page content={value} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
