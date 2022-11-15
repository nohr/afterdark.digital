import React from 'react'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { state } from '../../utils/state'
import ReactTilty from 'react-tilty'
import { convertDate } from '../../utils/common'
import { Link } from 'react-router-dom'

export default function Card({ project, key }) {
    const snap = useSnapshot(state);
    const image = {
        backgroundImage: `url(${project.cover})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        bacckgroundOpacity: "0.5"
    }

    function CardMetadata() {
        return <div className='metadata'>
            <div className='title'>{project.name}</div>
            <div style={{ fontVariantCaps: "all-small-caps" }}>{convertDate(project.date)}</div>
            {/* <div>{project.description}</div> */}
            {/* <img src={project.cover} alt={project.name} /> */}
        </div>
    }

    if (snap.mobile) {
        return (<CardStyle to={`/${project.path}`} style={image} key={key}><CardMetadata /></CardStyle>)
    } else {
        return (<ReactTilty reverse={true} easing={"cubic-bezier(0.03,0.98,0.52,0.99)"} style={{ height: '100%', aspectRatio: 1 / 1 }} key={key}>
            <CardStyle to={`/${project.path}`} style={image}><CardMetadata /></CardStyle></ReactTilty>)
    }
}

const CardStyle = styled(Link)`
    overflow-x: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    ${props => props.styling}
    height: 100%;
    background-color: transparent;
    /* background-color: var(--blue); */
    /* color: var(--offwhite); */
    overflow: hidden;
    text-decoration: none;
    aspect-ratio: 1 / 1;

    &:hover{
        /* opacity: 0.75; */
        border: 1px solid var(--blue);
        .metadata{
            background-color: var(--blue);
            color: var(--white) !important;
        }
    }

    .metadata{
        display: flex;
        justify-content: space-evenly;
        color: var(--contrast) !important;
        background-color: var(--bgSecondary);
        padding: 10px;
    }

    img{
        overflow: hidden;
        position: absolute;
        z-index: -10;
        opacity: 0.5;
        height: auto;
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        /* width: 45vw; */
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
    }

    /* transform: perspective(500px);  */
`