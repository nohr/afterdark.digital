import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import { HamburgerIcon, Logo } from '../utils/svg';
import Contact from './Contact';

function Header({ header }) {
    const navWrap = useRef(null);
    const snap = useSnapshot(state);

    useEffect(() => {
        if (navWrap.current) {
            navWrap.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });


    return (<MetaNavWrapper ref={header}>
        <NavWrapper ref={navWrap}>
            {!snap.mobile && <div className='Links'>
                <Logo />
                <a href='mailto:hello@afterdark.digital' className='footer caption'>hello@afterdark.digital</a>
                <NavLink to={'/shop'}>Shop</NavLink>
                <a
                    className={`${snap.menu && 'active'} menu`}
                    onClick={() => state.menu = !snap.menu}>
                    <HamburgerIcon />
                </a>
            </div>}
            {snap.mobile && <div className='Links'>
                <Logo />
                <a
                    className={`${snap.menu && 'active'} menu`}
                    onTouchEnd={() => state.menu = !snap.menu}>
                    <HamburgerIcon />
                </a>
            </div>}
        </NavWrapper>
        {(snap.menu) && <>
            {snap.mobile && <NavLink to={'/shop'}>Shop</NavLink>}
            <Contact />
        </>}
        {/* {!snap.mobile && <a href='mailto:hello@afterdark.digital' className='footer caption'>hello@afterdark.digital</a>} */}
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
        & *{
        transition: 0.3s !important;
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

    @media screen and (min-width: 768px) {
    justify-content: flex-end;
         & .Links{
            justify-content: flex-end !important;
            padding-left: 20px;
         }
    }

    & .Links{
        height: auto;
        width: 100%;
        display: flex;
        column-gap: 10px;
        justify-content: flex-start;
        font-weight: 700;
        font-style: italic;
        align-items: center;

        & a.Logo{
            overflow: visible !important;
            & svg{
             @media screen and (max-width: 768px) {
                width: auto;
                height: 42px;
             }
            }
        }

        & a:not(.Logo) {
            display: block;
            font-size: 20px;
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

    svg{
        overflow: visible !important;
        fill: transparent;
        stroke: var(--offwhite);
        stroke-width: 1px;
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