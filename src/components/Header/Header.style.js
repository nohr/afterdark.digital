import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MetaNavWrapper = styled.div`
  height: max-content;
  width: 100%;
  position: fixed;
  z-index: 4000;
  top: 0;
  display: flex;
  flex-direction: column;
  color: var(--offwhite) !important;

  & * {
    transition: 0.3s !important;
  }

  a,
  .link {
    color: var(--offwhite);
    width: min-content;
  }

  a.caption {
    justify-content: flex-start;
    &:hover {
      background-color: var(--black);
    }
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    top: 0;
    left: unset;
    bottom: unset;
  }
  .mobileNav {
    font-size: 20px;
    padding: 20px 0;
    font-variant-caps: all-small-caps;
    justify-content: space-around;
    display: flex;
    background-color: var(--blue);
    border: 1px dashed;
    border-color: var(--offwhite) transparent;
    * {
      font-weight: 700;
      padding: 5px;
      border: 1px solid var(--offwhite);
    }
  }
`;
export const NavWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  column-gap: 20px;
  row-gap: 10px;
  width: 100%;
  height: min-content;
  justify-content: center;
  background-color: var(--blue);

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
    & .Links {
      justify-content: space-between !important;
      & * {
        padding: 5px 10px;
        font-size: 2em !important;
      }
    }
  }

  & .Links {
    font-variant-caps: all-small-caps;
    height: auto;
    width: 100%;
    display: flex;
    column-gap: 10px;
    justify-content: flex-start;
    font-weight: 700;
    align-items: center;
    @media screen and (min-width: 768px) {
      justify-content: center;
    }
    & a.Logo {
      padding: 0 !important;
      cursor: pointer;
      overflow: visible !important;
      & svg {
        @media screen and (max-width: 768px) {
          width: auto !important;
          height: 42px !important;
        }
        @media screen and (max-width: 1366px) {
          width: 27vw;
        }
      }
    }

    & a:not(.Logo),
    .link {
      display: block;
      font-size: 20px;
      font-weight: 400;
      text-decoration: none;
      text-transform: uppercase;
      padding: 5px;
      width: fit-content;
      height: 42px;
      white-space: nowrap;
      justify-content: center;
      background-color: transparent;
      color: var(--offwhite);
      display: flex;
      align-items: center;

      &:hover {
        /* border-color: var(--offwhite); */
        /* background-color: var(--black); */
        /* color: var(--offwhite); */
      }

      &.active:not(.Logo) {
        cursor: default;
        border-color: var(--offwhite);
        background-color: var(--black);
        color: var(--offwhite) !important;
      }
    }
    & a.menu {
      cursor: pointer !important;
      margin-right: 20px;
    }
    & a.email {
      background-color: transparent !important;
      color: var(--offwhite);

      &:hover {
        background-color: var(--black) !important;
        color: var(--offwhite);
      }
    }
  }

  & * {
    text-decoration: none;
  }
`;
export const CategoryWrapper = styled.div`
  position: fixed;
  z-index: 4000;
  top: ${(props) => props.top};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin: 10px 0;
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  column-gap: 30px;

  @media screen and (max-width: 768px) {
    column-gap: 10px;
  }

  a,
  link {
    color: var(--contrast);
    cursor: pointer;
    border: 1px solid var(--contrast);
    padding: 10px 20px;
    background-color: var(--bgSecondary);

    &:hover,
    &.active {
      color: var(--bgSecondary) !important;
      background-color: var(--contrast) !important;
    }
  }
`;
export const SvgLogo = styled(NavLink)`
  width: 100%;
  cursor: pointer;

  svg {
    overflow: visible !important;
    /* fill: transparent;
        stroke: var(--offwhite);
        stroke-width: 1px; */
    fill: var(--offwhite);
    width: auto;
    height: 62px;

    &:hover > path {
      stroke: transparent;
      fill: var(--offwhite);
    }
  }

  &.active {
    cursor: default;
    border-color: var(--offwhite);
    background-color: transparent;
    color: var(--offwhite);

    svg {
      fill: var(--offwhite);
      stroke: transparent;
    }
  }
`;
export const NavIcon = styled.svg`
  stroke: none !important;
  fill: var(--offwhite);
  width: auto;
  height: 100%;
`;
