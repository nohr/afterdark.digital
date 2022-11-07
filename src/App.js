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
    console.log(header.current.clientHeight);
  }, [location, snap.categories, header]);

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
    })();

    return () => state.data = [];
  }, [db])

  // get realtime updates from firebase

  return (
    <div className="App">
      <Header header={header} user={user} />
      <ContentWrapper
        width={!(location.pathname === "/") ? "100%" : null}
        style={{ paddingTop: padding.header }}>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/editor" element={<Editor user={user} setUser={setUser} />} />
          {snap.data.map((value, index) => <Fragment key={index}>
            <Route path={`/${value.path}`} element={<Projects project={value} />} />
            {/* <Route path={`editor/${value.path}`} element={<Editor user={user} setUser={setUser} />} /> */}
          </Fragment>)}
          {snap.categories.map((category, index) =>
            <Route key={index} path={`/projects/${category.toLowerCase()}`} element={<Projects filter={category} />} />)}
        </Routes>
      </ContentWrapper>
    </div>
  );
}

export default App;

const ContentWrapper = styled.div`
    height: 100%;
    width: ${props => props.width};
    position: absolute;
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr; */
    display: flex;
    /* position: fixed; */
    flex-direction: column;
    /* overflow-x: hidden; */
    /* margin: 0 20px; */

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: var(--blue);
        a {
            color: #fff;
            text-decoration: none;
        }
    }

    @media screen and (max-width: 768px) {    
        .footer{
            position: fixed;
            bottom: 0;
            width: 100vw !important;
        }
    }

    @media screen and (min-width: 768px) {
        .footer{
            height: 26px;
            position: fixed;
            top: 100px;
            right: 0;
            width: min-content !important;
            padding: 0 10px;
        }
    }
`