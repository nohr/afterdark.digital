import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

function Contact() {
    const [value, setValue] = useState('');
    function handleSubmit(e) {
        e.preventdefault();
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (<FormWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.23 }}
    >
        <h2>Book with us!</h2>
        <Form onSubmit={handleSubmit}>
            <label>
                <p>First Name</p>
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <label>
                <p>Last Name</p>
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <label>
                <p>Instagram Handle</p>
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <label>
                <p>Email</p>
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <input className='submit' type="submit" value="Submit" />
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

    @media screen and (max-width: 768px) {
       width: 100%;
    }

    & h2{
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
            color: var(--black);
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
`