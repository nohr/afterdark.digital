import styled from "styled-components";
import Projects from "./Projects/Projects";

export default function Home({ marginTop }) {
  return (
    <HomeStyle>
      <Projects marginTop={marginTop} />
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: contents;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  /* height: 75vh; */
  background-color: var(--bgSecondary);
`;
