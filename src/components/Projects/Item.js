import styled from "styled-components";
import { useSnapshot } from "valtio";
import { generateElement } from "../../utils/common";
import { state } from "../../utils/state";

export default function Item({ item, key }) {
  const snap = useSnapshot(state);

  return (
    <ItemStyle
      key={key}
      styling={
        !snap.mobile
          ? `width: 80vw;`
          : `width: 100%; height: 80vh !important; & a{width: inherit;}`
      }
    >
      {generateElement(item, key)}
    </ItemStyle>
  );
}

const ItemStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  iframe {
    height: 100%;
    border: none;
  }

  img {
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    height: auto !important;
    width: 100vw;

    iframe {
      height: 60vh !important;
      border: none;
    }

    img {
      width: 100%;
      height: auto !important;
    }
  }
`;
