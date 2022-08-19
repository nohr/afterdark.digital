import React from 'react'
import styled from 'styled-components'
import ContactForm from './contactForm'
import Projects from './Projects'

function Page({ content }) {

    return (
        <ContentWrapper>
            {content === "contact" && <ContactForm />}
            {!content && <Projects />}
        </ContentWrapper>
    )
}

export default Page

const ContentWrapper = styled.div`
    border: 3px solid #000;
    /* margin: 10px; */
    height: 100%;
`