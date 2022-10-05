import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { state } from '../utils/state';


function Page({ content }) {
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });
    state.menu = false;
    return (<ContentPage ref={contentRef}>
        <h1>{content.project_name}</h1>
        <div>{content.date}</div>
        <img src={`${content.image}`} />
        <div>{content.description}</div>
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
        width: 100%;
    }
`