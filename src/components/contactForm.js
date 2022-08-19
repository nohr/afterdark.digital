import React, { useState } from 'react'
import styled from 'styled-components';

function Contact() {
    const [value, setValue] = useState('');
    function handleSubmit(e) {
        console.log(e);
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
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
    )
}

export default Contact

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 70ch;
    margin: 0 auto;
    & input{
        height: 40px;
    }
`