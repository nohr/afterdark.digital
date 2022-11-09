import { Fragment, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useSnapshot } from "valtio";
import styled from "styled-components";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import Header from "./components/Header";
import Projects from "./components/Projects";
import { state } from "./utils/state";
import { Editor } from "./components/Editor";
import { Shop } from "./components/Shop";
import { db } from "./utils/api";

function App() {
  const snap = useSnapshot(state);
  const header = useRef(null);
  const [user, setUser] = useState(null);
  const [padding, setPadding] = useState({ header: 0 });
  const auth = getAuth();
  let location = useLocation();

  useEffect(() => {
    setPadding({ header: header.current.clientHeight });
    // console.log(header.current.clientHeight);
  }, [location, header]);

  document.addEventListener('gesturestart', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gesturechange', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gestureend', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });

  // when the page loads, check if the user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    })
  }, [auth, setUser]);

  // Get and List document 
  useEffect(() => {
    (async () => {
      const q = query(collection(db, "projects"),
        // where("published", "==", true),
        orderBy("date", "desc"));
      const data = await getDocs(q);
      state.data = data.docs.map(doc => doc.data());
      state.categories = [...new Set(data.docs.map(doc => doc.data().category))];
      state.categories.sort();
    })();

    return () => state.data = [];
  }, [db])

  // get realtime updates from firebase

  return <div className="App">
    <Header header={header} user={user} />
    <Routes>
      <Route path="/" element={<Projects marginTop={padding.header} />} />
      <Route path="/projects" element={<Projects marginTop={padding.header} />} />
      <Route path="/editor" element={<Editor user={user} setUser={setUser} marginTop={padding.header} />} />
      <Route path="/shop" element={<Shop marginTop={padding.header} />} />
      {snap.data.map((value, index) =>
        <Route key={index} path={`/${value.path}`}
          element={<Projects project={value} marginTop={padding.header} />} />)}
      {snap.categories.map((category, index) =>
        <Route key={index} path={`/projects/${category.toLowerCase()}`}
          element={<Projects filter={category} marginTop={padding.header} />} />)}
    </Routes>
  </div>;
}

export default App;

const ContentWrapper = styled.div`
    height: 70%;
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    /* position: absolute; */
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr; */
    /* position: fixed; */
    /* overflow-x: hidden; */
    /* margin: 0 20px; */
`