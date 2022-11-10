import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

function Contact() {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [insta, setInsta] = useState('');
    const [email, setEmail] = useState('');

    return (<FormWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.23 }}
    >
        <h3>Book with us!</h3>
        <div className=''> <a href='mailto:hello@afterdark.digital'>hello@afterdark.digital</a></div>
        <Form onSubmit={e => e.preventDefault()}>
            <label>
                <p>First Name</p>
                <input type="text" value={first} onChange={e => setFirst(e.target.value)} required />
            </label>
            <label>
                <p>Last Name</p>
                <input type="text" value={last} onChange={e => setLast(e.target.value)} />
            </label>
            <label>
                <p>Instagram Handle</p>
                <input type="text" value={insta} onChange={e => setInsta(e.target.value)} />
            </label>
            <label>
                <p>Email</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <button className='submit' type="submit">Submit</button>
        </Form>
    </FormWrapper>)
}

export default Contact;

const FormWrapper = styled(motion.div)`
    padding: 10px;
    margin: 0 auto;
    /* height: 100%; */
    width: 60ch;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--offwhite) !important;
    background-color: var(--blue);

    @media screen and (max-width: 768px) {
       width: 100%;
    }

    & h3{
        padding: 0 0 5px 0;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: flex-end;

        @media screen and (min-width: 768px) {
            flex-direction: column;
        }

    & label{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        & p {
            font-size: unset !important;
        }
    }

    & input{
        padding: 0 5px;
        font-size: 16px;
        height: 40px;
        color: var(--offwhite);
        background-color: transparent !important;
        border: 1px solid var(--offwhite);

        &:focus{
            color: var(--black) !important;
            background-color: var(--offwhite) !important;
        }

        &.submit{
            padding: 5px 10px !important;
            margin: 10px auto;
            -webkit-appearance: none;
            /* border: 1px solid var(--offwhite); */
            /* border-radius: 25px; */
            color: var(--offwhite);
            background-color: transparent !important;
        }
    }
        button{
            margin: auto;
            font-size: 12px;
        white-space: nowrap;
        display: block;
        cursor: pointer;
        width: min-content;
        height: 30px;
        padding: 5px 10px !important;
        -webkit-appearance: none;
        color: var(--offwhite);
        border: none;
        border-radius: 0;
        border: 1px solid var(--offwhite);
        background-color: var(--blue) !important;

            &:hover{
                opacity: 50%;
                background-color: var(--bluealpha) !important;
            }
    }

`