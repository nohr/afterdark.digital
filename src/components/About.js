import { useEffect } from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import { handleGetAbout } from "../utils/firebase/firebase.service";
import { state } from "../utils/state";

export default function About({ marginTop }) {
  const snap = useSnapshot(state);
  useEffect(() => {
    handleGetAbout();
  }, []);

  return (
    <ContentPage marginTop={marginTop}>
      <h1>About</h1>
      <div className="description">{snap.about}</div>
    </ContentPage>
  );
}

const ContentPage = styled.div`
  margin-top: ${(props) => props.marginTop}px;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--black) !important;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    .description {
      width: 100% !important;
      height: 100vh !important;
    }
  }

  .description {
    width: 70ch;
    white-space: pre-line;
    overflow-y: scroll;
    height: 50vh;
    background-color: var(--bgPrimary);
    padding: 10px;
  }
`;
