import React, { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { state } from '../../utils/state'
import { handleMousemove } from '../../utils/scroll'
import Details from './Details'
const Card = React.lazy(() => import('./Card'));
const Item = React.lazy(() => import('./Item'));


function Projects({ filter, project, marginTop }) {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);
    const [projects, setProjects] = useState([]);

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

    // log ready to the console when the images are downloaded
    useEffect(() => {
        const images = document.querySelectorAll("img");
        let loaded = 0;
        images.forEach(image => {
            image.addEventListener("load", () => {
                loaded++;
                if (loaded === images.length) {
                    console.log("ready");
                }
            })
        })
    }, [])

    const loaderStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--bgPrimary)",
        color: "var(--textPrimary)",
        fontSize: "1.5rem",
        fontWeight: "bold",
        letterSpacing: "0.1rem",
        textTransform: "uppercase",
        textAlign: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000
    }

    return (<CardScroller ref={CardsScroll} className='CardsScroll' initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeIn", duration: 0.23 }}
        height={project ? snap.mobile ? '100%' : `75%` : `80%`} margintop={project ? `${marginTop}px` : `calc(${marginTop}px + 51px)`}>
        <CardWrapper styling={project ? `${snap.mobile ? "flex-direction: column; padding-bottom: 60px;" : "height: 100%; padding: 0 20px;"} column-gap: 20px !important;`
            : `width: 100%; ${snap.mobile ? ' flex-direction: column;' : 'height: 100%; flex-direction: row;'}`}
        >
            {project ?
                // project is selected, show the content
                project.content.map((item, key) =>
                    <Suspense key={key} fallback={<div style={loaderStyle}>Loading...</div>}>
                        <Item key={key} item={item} />
                    </Suspense>)
                : // none selected, show project cards
                projects.map((project, key) => <Suspense key={key} 
                    fallback={<div style={loaderStyle}>Loading...</div>}>
                    <Card project={project} key={key} />
                </Suspense>)}
        </CardWrapper>
        {project && <Details project={project} />}
    </CardScroller >)
}

export default Projects;

const CardScroller = styled(motion.div)`
    display: block;
    margin-top: ${props => props.margintop};

    @media screen and (min-width: 768px) {
        height:${props => props.height};
    }
`
const CardWrapper = styled.div`
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    ${props => props.styling}

    @media screen and (max-width: 768px) {
        align-items: center;
    }
`