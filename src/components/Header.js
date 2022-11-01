import React, { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { useSnapshot } from 'valtio';
import { auth } from '../utils/api';
import { state } from '../utils/state';
import { HamburgerIcon, Logo } from '../utils/svg';
import Contact from './Contact';

function Header({ header, user }) {
    const navWrap = useRef(null);
    const snap = useSnapshot(state);
    let location = useLocation();

    useEffect(() => {
        if (navWrap.current) {
            navWrap.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: true });
        }
    });

    useEffect(() => {
        return () => {
            state.menu = false;
        }
    }, [location])


    return (<MetaNavWrapper ref={header}>
        <NavWrapper ref={navWrap}>
            {!snap.mobile && <div className='Links'>
                <a onClick={() => state.menu = !snap.menu} className={snap.menu ? `active` : null}> Contact</a>
                {user && <NavLink to={'/editor'}>Editor</NavLink>}
                <Logo />
                <NavLink to={'/shop'}>Shop</NavLink>
                {user && <a href='#' onClick={() => auth.signOut()} >Sign Out</a>}

                {/* <a href='mailto:hello@afterdark.digital' className='footer caption'>hello@afterdark.digital</a> */}
            </div>}
            {snap.mobile && <div className='Links'>
                <Logo />
                <a onTouchEnd={() => state.menu = !snap.menu}> <HamburgerIcon /> </a>
            </div>}
        </NavWrapper>
        {(snap.menu) && <>
            {snap.mobile && <div>
                <NavLink to={'/shop'}><h1>Shop</h1></NavLink>
                {/* {user && <NavLink to={'/editor'}><h1>Editor</h1></NavLink>} */}
                <NavLink to={'/editor'}><h1>Editor</h1></NavLink>
            </div>}
            <Contact />
        </>}
    </MetaNavWrapper>)
}

export default Header

const MetaNavWrapper = styled.div`
    height: max-content;
    width: 100%;
    position: fixed;
    z-index: 4000;
    top: 0;
    /* left: 0; */
    background-color: var(--blue);
    display: flex;
    flex-direction: column;
    color: var(--offwhite) !important;
    border-bottom: 1px solid var(--blue);
    
    & *{
        transition: 0.3s !important;
    }

    a{
        color: var(--offwhite);
        width:min-content;
    }

    a.caption{
        justify-content: flex-start;
        &:hover{
            background-color: var(--black);
        }
    }
    @media screen and (max-width: 768px) {
        /* position: relative !important; */
        top: 0;
        left: unset;
        bottom: unset;
        /* width: 100wv; */
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
    
    @media screen and (max-width: 768px) {
        flex-direction: column;
        width: 100vw;

         & .Links{
            justify-content: space-between !important;
            /* column-gap: 20px !important; */

            & *{
                padding: 5px 10px;
                font-size: 2em !important;
            }
         }
    }

    & .Links{
        height: auto;
        width: 100%;
        display: flex;
        column-gap: 10px;
        justify-content: flex-start;
        font-weight: 700;
        /* font-style: italic; */
        align-items: center;
    @media screen and (min-width: 768px) {
        justify-content: center;
    }
        & a.Logo{
            cursor: pointer;
            overflow: visible !important;
            & svg{
             @media screen and (max-width: 768px) {
                width: auto !important;
                height: 42px !important;
             }
             @media screen and (max-width: 1366px) {
                width: 27vw;
             }
            }
        }

        & a:not(.Logo) {
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

            &:hover{
                /* border-color: var(--offwhite); */
                /* background-color: var(--black); */
                /* color: var(--offwhite); */
            }

            &.active:not(.Logo){
                cursor: default;
                border-color: var(--offwhite);
                background-color: var(--black);
                color: var(--offwhite) !important;
            }
        }
        & a.menu{
            cursor: pointer !important;
            margin-right: 20px;
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
    cursor: pointer;

    svg{
        overflow: visible !important;
        /* fill: transparent;
        stroke: var(--offwhite);
        stroke-width: 1px; */
        fill: var(--offwhite);
        width: auto;
        height: 62px;

        &:hover > path{
            stroke: transparent;
            fill: var(--offwhite);
        }
    }

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
        
`
export const NavIcon = styled.svg`
        stroke: none !important;
        fill: var(--offwhite);
        width: auto;
        height: 100%;
`