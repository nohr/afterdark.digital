import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Page from "./components/Page";
import { useSnapshot } from "valtio";
import { state } from "./utils/state";
import { Dashboard } from "./components/Dashboard";
import { Shop } from "./components/Shop";
import Projects from "./components/Projects";
import styled from "styled-components";

function App() {
  const snap = useSnapshot(state);
  const header = useRef(null);
  const footer = useRef(null);
  const [user, setUser] = useState(null);
  const [padding, setPadding] = useState({ header: 0, footer: 0 });
  let location = useLocation();

  useEffect(() => {
    setPadding({
      header: header.current.clientHeight,
      footer: footer.current ? footer.current.clientHeight : 0
    });
  }, [])

  document.addEventListener('gesturestart', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gesturechange', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gestureend', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });

  return (
    <div className="App">
      <Header header={header} user={user} />
      <ContentWrapper
        width={!(location.pathname === "/") ? "100%" : null}
        style={{ paddingTop: padding.header, paddingBottom: padding.footer }}
      >
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          {snap.data.map((value, index) => (
            <Route path={`/${value.id}`} key={index} element={<Page content={value} />} />
          ))}
        </Routes>
        {snap.mobile && <a ref={footer} href='mailto:hello@afterdark.digital' className='footer mobile'>hello@afterdark.digital</a>}
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
    overflow: hidden;
    /* margin: 0 20px; */

    @media screen and (max-width: 768px) {    
        a.footer{
            position: fixed;
            bottom: 0;
            width: 100vw !important;
        }
    }
`