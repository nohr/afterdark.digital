import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import Projects from './Projects'

function Content({ content }) {
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });

    return (<ContentPage ref={contentRef}>
        <h1>{content.project_name}</h1>
        <div>{content.date}</div>
        <img src={`${content.image}`} />
        <div>{content.description}</div>
    </ContentPage>);
}
function Page({ content }) {
    const snap = useSnapshot(state);

    return (
        <ContentWrapper>
            {content === "home" ? <Projects /> : null}
            {content !== "home" && <Content content={content} />}
            {snap.mobile && <a href='mailto:hello@afterdark.digital' className='footer mobile'>hello@afterdark.digital</a>}
        </ContentWrapper>
    );
}

export default Page;

const ContentWrapper = styled.div`
    /* border: 1px solid #000; */
    height: 100%;
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr; */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* margin: 0 20px; */

    /* @media screen and (max-width: 768px) {
    } */
`
const ContentPage = styled.div`
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    margin: auto 0;

    img{
        width: 100%;
    }
`