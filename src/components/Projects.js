import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import dummyData from '../dummyData.json'

function Project({ ...props }) {
    return (<Card>
        <div className='title'>{props.title}</div>
    </Card>)
}

function Projects() {
    return (<CardScroller
        initial={{ y: -600 }}
        animate={{ y: 0 }}
        exit={{ y: -600 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
    >
        {/* <h2>Recent Projects</h2> */}
        <CardWrapper>
            {dummyData.map((project, key) => (
                <Project project={project} key={key} />
            ))}
        </CardWrapper>
    </CardScroller>)
}

export default Projects

const CardScroller = styled(motion.div)`
    overflow-x: scroll;
    width: 100%;
    height: 80%;
    margin: auto 0;
    /* transform: skew(40px); */

    ::-webkit-scrollbar {
        -webkit-appearance: none !important;
        height: 15px;
        width: 15px;
        /* position: absolute; */
    }

    ::-webkit-scrollbar-thumb {
        background-color: #0f6aff;
    }
`
const CardWrapper = styled.div`
    width: max-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
    padding: 0 0 20px 0;
`
const Card = styled.div`
    display: grid;
    grid-template-columns: 10;
    width: 300px;
    height: 100%;
    border: 1px solid #0f6aff;
`