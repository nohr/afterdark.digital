import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { state } from '../utils/state'
import { useSnapshot } from 'valtio'
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'
import { edgeSize, handleMousemove } from '../utils/scroll'


function Project({ project }) {
    const snap = useSnapshot(state);
    // position the image in the center of the card
    const image = {
        backgroundImage: `url(${project.cover})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        bacckgroundOpacity: "0.5",
    }
    function Contents() {
        return <>
            {/* <img src={project.cover} /> */}
            <div className='title'>{project.name}</div>
            {/* <div>{project.date}</div> */}
            <div>{project.description}</div>
        </>
    }

    if (snap.mobile) {
        return (<Card to={`/${project.path}`} style={image}><Contents /></Card>)
    } else {
        return (<Tilt options={{ reset: true, easing: "cubic-bezier(0.03,0.98,0.52,0.99)", }}
            style={{ height: '100%' }}>
            <Card to={`/${project.path}`} style={image}><Contents /></Card></Tilt>)
    }
}
function Projects() {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);

    useEffect(() => {
        !snap.mobile && CardsScroll.current.addEventListener("mousemove", handleMousemove, false);
    }, [snap.mobile])

    return (<CardScroller
        ref={CardsScroll}
        className='CardsScroll'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.23 }}
    >
        <CardWrapper>
            {snap.data.map((project, key) =>
                <Project project={project} key={key} />)}
        </CardWrapper>
        {/* Red Egdes */}
        {!snap.mobile && <span
            className='edge'
            style={{
                position: "fixed",
                zIndex: "-3",
                top: edgeSize - 50 + "px",
                bottom: edgeSize - 50 + "px",
                left: edgeSize + 80 + "px",
                right: edgeSize + 81 + "px",
                border: "1px solid",
                borderColor: "#00000000 #f00",
                borderRadius: "5px 5px 5px 5px",
            }}
        ></span>}
    </CardScroller>)
}

export default Projects

const CardScroller = styled(motion.div)`
    /* overflow-x: scroll; */
    /* width: 100%; */
    height: 100%;
    margin: auto 0;
    display: block;
`
const CardWrapper = styled.div`
    /* transform: skewX(4deg); */
    height: 100%;
    transition: 0.3s;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* column-gap: 10px; */
    padding: 100px 0;
    width: fit-content;

    @media screen and (max-width: 768px) {
        padding: 0;
        align-items: center;
    }
`
const Card = styled(Link)`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 0.25fr 0.25fr 1fr ;
    width: 85vw;
    height: 100%;
    background-color: transparent;
    color: var(--black);
    /* background-color: var(--blue); */
    /* color: var(--offwhite); */
    overflow: hidden;
    text-decoration: none;
    img{
        overflow: hidden;
        position: absolute;
        z-index: -10;
        /* height: 100% !important; */
        width: auto !important;
        opacity: 0.5;
    }

    @media screen and (min-width: 768px) {
        width: 45vw;
    }

    &:hover{
        /* opacity: 0.75; */
        border: 1px solid var(--blue);
    }

    div{
        padding: 0 10px;
    }
    & img{
        overflow: hidden;
        /* position: absolute;
        left: 50%;
        transform: translateX(-50%); */
        height: auto;
        width: 100%;
    }
    /* transform: perspective(500px);  */
`