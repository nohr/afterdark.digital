import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { state } from '../utils/state';

function Page({ project }) {
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: true });
        }
    });
    state.menu = false;
    return (<ContentPage ref={contentRef}>
        <h1>{project.name}</h1>
        <h1>{project.category}</h1>
        {/* <div>{project.date}</div> */}
        <a href={project.url} target='_blank' rel='noreferrer'>Link</a>
        <img src={`${project.cover}`} />
        <div>{project.description}</div>
    </ContentPage>
    );
}

export default Page;

const ContentPage = styled.div`
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    margin: auto 0;

    img{
        height: 250px;
    }
`