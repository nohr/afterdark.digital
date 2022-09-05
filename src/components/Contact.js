import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

function Contact() {
    const [value, setValue] = useState('');
    function handleSubmit(e) {
        console.log(e);
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (<FormWrapper
        initial={{ y: -600 }}
        animate={{ y: 0 }}
        exit={{ y: -600 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
    >
        {/* <h2></h2> */}
        <Form onSubmit={handleSubmit}>
            <label>
                <input type="text" value={value} onChange={handleChange} />
                First Name
                <input type="text" value={value} onChange={handleChange} />
                Last Name
            </label>
            <label>
                <input type="text" value={value} onChange={handleChange} />
                Instagram Handle
            </label>
            <label>
                <input type="text" value={value} onChange={handleChange} />
                Email
            </label>
            <input type="submit" value="Submit" />
        </Form>
    </FormWrapper>)
}

export default Contact;

const FormWrapper = styled(motion.div)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    & input{
        font-size: 16px;
        height: 40px;
    }
`