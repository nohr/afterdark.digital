import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import { Dashboard } from './Dashboard';
import Projects from './Projects'
import { Shop } from './Shop';

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



function Page({ content, header }) {
    const snap = useSnapshot(state);
    const [padding, setPadding] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setPadding(header.current.clientHeight)
    }, [])
    return (
        <ContentWrapper
            width={!(content === "home") ? "100%" : null}
            style={{ paddingTop: padding }}
        >
            {(content === "home") ? <Projects user={user} />
                : (content === "dashboard") ? <Dashboard user={user} setUser={setUser} />
                    : (content === "shop") ? <Shop />
                        : <Content content={content} />}
            {snap.mobile && <a href='mailto:hello@afterdark.digital' className='footer mobile'>hello@afterdark.digital</a>}
        </ContentWrapper>
    );
}

export default Page;

const ContentWrapper = styled.div`
    height: 100%;
    width: ${props => props.width};
    position: absolute;
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr; */
    display: flex;
    /* position: fixed; */
    flex-direction: column;
    overflow: hidden;
    /* margin: 0 20px; */

    @media screen and (max-width: 768px) {    
        padding-top: 60px;
        a.footer{
            position: fixed;
            bottom: 0;
            width: 100vw;
        }
    }
`
export const ContentPage = styled.div`
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    margin: auto 0;

    img{
        width: 100%;
    }
`