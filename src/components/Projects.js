import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'
import { state } from '../utils/state'
import { handleMousemove } from '../utils/scroll'

function Projects({ project }) {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);

    // turn on horizontal scroll only for desktop
    useEffect(() => {
        !snap.mobile && CardsScroll.current.addEventListener("mousemove", handleMousemove, false);
    }, [snap.mobile])

    return (<CardScroller ref={CardsScroll} className='CardsScroll'
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.23 }}
    >
        <CardWrapper styling={project ? ` 
        column-gap: 50px !important;
        `: ""} >
            {project ?
                project.content.map((item, key) => {
                    // check if the content is an image, video, or tiktok
                    const element = item.type === 'image' ? <img src={item.url} alt={item.name} key={key} /> :
                        item.type === 'video' ? <video src={item.url} alt={item.name} key={key} controls></video> :
                            item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={key} allow-scripts="true"
                                sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                                <p>{item.type} type not supported</p>;

                    return <Item key={key}>
                        {element}
                        {/* <button className={`delete`} style={{ width: "min-content" }} onClick={() => handleDeleteContent(item, key)} type='button'>Delete {item.type}</button> */}
                    </Item>
                })
                : snap.data.map((project, key) => {
                    // set bg image in the center of the card
                    const image = {
                        backgroundImage: `url(${project.cover})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        bacckgroundOpacity: "0.5"
                    }

                    function Contents() {
                        // console.log(project.date);
                        // Conver

                        return <div className='metadata'>
                            <div className='title'>{project.name}</div>
                            {/* <div>{project.date}</div> */}
                            <div>{project.description}</div>
                        </div>
                    }

                    if (snap.mobile) {
                        return (<Card to={`/${project.path}`} style={image} key={key}><Contents /></Card>)
                    } else {
                        return (<Tilt options={{ reset: false, easing: "cubic-bezier(0.03,0.98,0.52,0.99)", }}
                            style={{ height: '100%' }} key={key} >
                            <Card to={`/${project.path}`} style={image}><Contents /></Card></Tilt>)
                    }
                })}
        </CardWrapper>
        {/* Red Egdes */}
        {/* {!snap.mobile && <span
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
        ></span>} */}
    </CardScroller>)
}

export default Projects

const CardScroller = styled(motion.div)`
    /* width: 100%; */
    height: fit-content;
    margin: auto;
    display: block;
`
const CardWrapper = styled.div`
    /* transform: skewX(4deg); */
    height: 75vh;
    transition: 0.3s;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* column-gap: 10px; */
    /* padding-top: 30px; */
    padding: 0 50px;
    margin: auto 0;
    width: fit-content;
    ${props => props.styling}

    @media screen and (max-width: 768px) {
        /* padding: 0; */
        align-items: center;
    }
`
const Card = styled(Link)`
    overflow-x: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 85vw;
    height: 100%;
    background-color: transparent;
    /* background-color: var(--blue); */
    /* color: var(--offwhite); */
    overflow: hidden;
    text-decoration: none;

    .metadata{
        color: var(--white) !important;
        background-color: var(--blue);
        padding: 10px 0;
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
        width: 45vw;
    }

    &:hover{
        /* opacity: 0.75; */
        border: 1px solid var(--blue);
    }

    div{
        padding: 0 10px;
    }
    /* transform: perspective(500px);  */
`
const Item = styled.div`
    position: relative;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    width: 100%;
    height: 100%;

    iframe{
        height: 100%;
        border: none;
    }

    img{
        height: 100%;
    }
    `