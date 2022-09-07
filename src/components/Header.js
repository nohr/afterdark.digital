import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import { EmailIcon, HamburgerIcon, Logo } from '../utils/svg';
import Contact from './Contact';

function Header() {
    const navWrap = useRef(null);
    const snap = useSnapshot(state);

    useEffect(() => {
        if (navWrap.current) {
            navWrap.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });


    return (<MetaNavWrapper>
        <NavWrapper ref={navWrap}>
            {!snap.mobile && <>
                <Logo />
                <a className={snap.menu ? 'active' : null}
                    onClick={() => state.menu = !snap.menu}>
                    <HamburgerIcon />
                </a>
            </>}
            {snap.mobile && <div className='Links'>
                <Logo />
                <a className={snap.menu ? 'active' : null}
                    onTouchEnd={() => state.menu = !snap.menu}>
                    <HamburgerIcon />
                </a>
            </div>}
        </NavWrapper>
        {snap.menu && <Contact />}
        {!snap.mobile && <a href='mailto:hello@afterdark.digital' className='footer'>hello@afterdark.digital</a>}
    </MetaNavWrapper>)
}

export default Header

const MetaNavWrapper = styled.div`
    height: max-content;
    width: min-content;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--blue);
    display: flex;
    flex-direction: column;
    color: var(--offwhite) !important;
    p.caption{
        padding: 0 0 20px 0;
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        position: relative !important;
        width: 100%;
    }
`
const NavWrapper = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: row;
    column-gap: 20px;
    row-gap: 10px;
    width: 100%;
    height: min-content;
    justify-content: center;
    /* padding-bottom: 10px; */
    /* padding: 20px !important; */
    /* transform:skewY(10deg) !important; */

    & *{
        transition: 0.3s !important;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;

         & .Links{
            justify-content: space-between !important;
            column-gap: 20px !important;

            & *{
                padding: 5px 10px;
                font-size: 2em !important;
            }
         }
    }

    @media screen and (min-width: 768px) {
    justify-content: flex-end;
         & .Links{
            justify-content: flex-end !important;
         }
    }

    & .Links{
        width: 100%;
        display: flex;
        column-gap: 10px;
        justify-content: flex-start;
        font-weight: 700;
        font-style: italic;
        align-items: center;

        & a {
            display: block;
            font-size: 7vw;
            text-transform: uppercase;
            padding: 5px;
            width: fit-content;
            height: 42px;
            white-space: nowrap;
            /* border: 1px solid var(--offwhite);  */
            background-color: transparent;
            color: var(--offwhite);
            display: flex;
            align-items: center;

            &:hover{
                /* border-color: var(--offwhite); */
                /* background-color: var(--black); */
                /* color: var(--offwhite); */
            }

            &.active:not(.Logo){
                cursor: default;
                border-color: var(--offwhite);
                background-color: var(--black);
                color: var(--black) !important;
            }
        }
        & a.email{
            background-color: transparent !important;
            color: var(--offwhite);

            &:hover{
                background-color: var(--black) !important;
                color: var(--offwhite);
            }
        }
    }

    & *{
        text-decoration: none;
    }
`
export const SvgLogo = styled(NavLink)`
    width: 100%;
    &.active{
        cursor: default;
        border-color: var(--offwhite);
        background-color: transparent;
        color: var(--offwhite);
        
        svg{
            fill: var(--offwhite);
            stroke: transparent;
        }
    }

    svg{
        fill: transparent;
        stroke: var(--offwhite);
        stroke-width: 1px;
        width: auto;
        height: 100%;

        &:hover > path{
            stroke: transparent;
            fill: var(--offwhite);
        }
    }
        
`
export const NavIcon = styled.svg`
        stroke: none !important;
        fill: var(--offwhite);
        width: auto;
        height: 100%;

    @media screen and (max-width: 768px) {
        height: 8vw;
    }

`