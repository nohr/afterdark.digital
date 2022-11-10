import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { Link } from 'react-router-dom'
import { state } from '../utils/state'
import { handleMousemove } from '../utils/scroll'
import ReactTilty from 'react-tilty'
import { Arrow } from '../utils/svg'

function Projects({ filter, project, marginTop }) {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);
    const [projects, setProjects] = useState([]);
    const [hide, setHide] = useState(false);

    // turn on horizontal scroll only for desktop
    useEffect(() => {
        if (!snap.mobile) CardsScroll.current.addEventListener("mousemove", handleMousemove, false);
        return () => null;
    }, [snap.mobile])

    // filter projects
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
        animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeIn", duration: 0.23 }}
        height={project ? snap.mobile ? '100%' : `75%` : `80%`} marginTop={project ? `${marginTop}px` : `calc(${marginTop}px + 51px)`}>
        <CardWrapper styling={project ? `${snap.mobile ? "height: 70vh;" : "height: 100%; padding: 0 20px;"} column-gap: 20px !important;`
            : `flex-direction: column; width: 100%; ${snap.mobile ? ' flex-direction: column;' : 'height: 100%; flex-direction: row;'}`}
        >
            {project ?
                project.content.map((item, key) => {
                    // check if the content is an image, video, or tiktok
                    const element = item.type === 'image' ? <img src={item.url} alt={item.name} key={key} /> :
                        item.type === 'video' ? <video src={item.url} alt={item.name} key={key} controls></video> :
                            item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={key} allow-scripts="true"
                                sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                                <p>{item.type} type not supported</p>;
                    return <Item key={key} styling={!snap.mobile ? `width: 80vw;`
                        : `width: 80vw; height: 100%; & a{width: inherit;}`}>{element}</Item>
                })
                : // home page cards
                projects.map((project, key) => {
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
                        </div>
                    }

                    if (snap.mobile) {
                        return (<Card to={`/${project.path}`} style={image} key={key}><CardMetadata /></Card>)
                    } else {
                        return (<ReactTilty reverse={true} easing={"cubic-bezier(0.03,0.98,0.52,0.99)"} style={{ height: '100%', aspectRatio: 1 / 1 }} key={key}><Card to={`/${project.path}`} style={image}><CardMetadata /></Card></ReactTilty>)
                    }
                })}
        </CardWrapper>
        {project && <ProjectDetails height={!hide ? '35%' : 'min-content'}>
            <div className='details'>
                <Arrow hide={hide} setHide={setHide} />
                <h1>{project.name}</h1>
                {!hide && <div className='caption'>
                    <p style={{ fontVariantCaps: "all-small-caps" }}>{convertDate(project.date)}</p>
                    {project.url !== '' && <a href={project.url} target='_blank' rel='noreferrer'>{project.url.replace(/(^\w+:|^)\/\//, '')}</a>}
                </div>}
            </div>
            {!hide && <p className='desc'>{project.description}</p>}
        </ProjectDetails>}
    </CardScroller >)
}

export default Projects;

const CardScroller = styled(motion.div)`
    display: block;
    margin-top: ${props => props.marginTop};

    @media screen and (min-width: 768px) {
        height:${props => props.height};
    }
`
const CardWrapper = styled.div`
    /* transform: skewX(4deg); */
    /* height: 100%; */
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
        /* padding: 50px 0; */
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
const Item = styled.div`
    position: relative;
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
const ProjectDetails = styled.div`
        position: fixed;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    row-gap: 15px;
        height: min-content;
        background-color: var(--bgSecondary);

    .details{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 5px;
    }

    .caption{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        flex-wrap: wrap;
    }
    .desc{
        white-space: pre-line;
        overflow-y: scroll;
        height: 200px;
        background-color: var(--bgPrimary);
        padding: 10px;
    }

    a{
        font-weight: 700;
        padding: 1px 6px;
        color: var(--white) !important;
        background-color: var(--blue) !important;

        &:hover{
            color: var(--blue) !important;
            background-color: var(--white) !important;
        }
    }

    @media screen and (min-width: 768px) {
        bottom: 10px;
        margin-top: 20px;
        padding: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 65ch;
    }

    @media screen and (max-width: 768px) {
        bottom: 0px;
        padding: 10px;
        width: 100vw;
    }
`