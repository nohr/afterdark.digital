import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { Link } from 'react-router-dom'
import { state } from '../utils/state'
import { handleMousemove } from '../utils/scroll'
import ReactTilty from 'react-tilty'

function Projects({ filter, project }) {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);
    const [projects, setProjects] = useState([]);

    // turn on horizontal scroll only for desktop
    useEffect(() => {
        if (!snap.mobile) CardsScroll.current.addEventListener("mousemove", handleMousemove, false);
        return () => null;
    }, [snap.mobile])

    useEffect(() => {
        filter && setProjects(snap.data.filter(project => project.category === filter));
        !filter && setProjects(snap.data);
    }, [filter, setProjects, snap.data]);

    // convert firebase timestamp to date
    const convertDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    }

    return (<CardScroller ref={CardsScroll} className='CardsScroll' initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeIn", duration: 0.23 }}>
        <CardWrapper styling={project ? `column-gap: 20px !important; height: 100%; padding: 0 50px;`
            : `flex-direction: column; width: 100%; ${snap.mobile ? ' flex-direction: column;' : 'height: 100%; flex-direction: row;'}`} >
            {project ?
                project.content.map((item, key) => {
                    // check if the content is an image, video, or tiktok
                    const element = item.type === 'image' ? <img src={item.url} alt={item.name} key={key} /> :
                        item.type === 'video' ? <video src={item.url} alt={item.name} key={key} controls></video> :
                            item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={key} allow-scripts="true"
                                sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                                <p>{item.type} type not supported</p>;
                    return <Item key={key} styling={!snap.mobile ? `width: 80vw;`
                        : `width: 100vw; height: 100%; & a{width: inherit;}`}>
                        {element}
                        {/* <button className={`delete`} style={{ width: "min-content" }} onClick={() => handleDeleteContent(item, key)} type='button'>Delete {item.type}</button> */}
                    </Item>
                })
                : projects.map((project, key) => {
                    // set bg image in the center of the card
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
                            <div>{convertDate(project.date)}</div>
                            {/* <div>{project.description}</div> */}
                        </div>
                    }

                    if (snap.mobile) {
                        return (<Card to={`/${project.path}`} style={image} key={key}><CardMetadata /></Card>)
                    } else {
                        return (<ReactTilty reverse={true} easing={"cubic-bezier(0.03,0.98,0.52,0.99)"} style={{ height: '100%', aspectRatio: 1 / 1 }} key={key}>
                            <Card to={`/${project.path}`} style={image}><CardMetadata /></Card>
                        </ReactTilty>)
                    }
                })}
        </CardWrapper>
        {project && <div>
            <h1>{project.name}</h1>
            <p>{convertDate(project.date)}</p>
            <a href={project.url} target='_blank' rel='noreferrer'>{project.url}</a>
            <p>{project.description}</p>
        </div>
        }
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
    </CardScroller >)
}

export default Projects;

const CardScroller = styled(motion.div)`
    height: 100%;
    display: block;
`
const CardWrapper = styled.div`
    /* transform: skewX(4deg); */
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    ${props => props.styling}

    @media screen and (max-width: 768px) {
        align-items: center;
    }
    @media screen and (min-width: 768px) {
    padding: 50px 0;
    }
`
const Card = styled(Link)`
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
        color: var(--white) !important;
        background-color: var(--blue);
        }
    }

    .metadata{
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