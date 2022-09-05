import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import Projects from './Projects'

function Page({ content }) {
    const contentWrapper = useRef(null);

    // useEffect(() => {
    //     if (contentWrapper.current) {
    //         contentWrapper.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
    //     }
    // });
    return (
        <ContentWrapper ref={contentWrapper}>
            {content === "contact" && <Contact />}
            {<Projects />}
        </ContentWrapper>
    )
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
    margin: 0 20px;

    /* @media screen and (max-width: 768px) {
    } */
`