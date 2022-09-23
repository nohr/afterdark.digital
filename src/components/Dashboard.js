import { useEffect, useRef, useState } from 'react';
import { auth, signInWithGoogle } from '../utils/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'firebase/storage'
import styled from 'styled-components';


function Login() {
    // firebaseui.auth
    return (<ContentPage>
        <h1>Login</h1>
        <button onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    </ContentPage>);
}

function Home() {
    const form = useRef(null);
    const [pics, setPics] = useState(0);
    const [embeds, setEmbeds] = useState(0);

    function submitPortfolio(e) {
        e.prevent.default();
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        // const storageRef = ref(storage, `portfolio/${}`);
    }

    function Pics() {

        return (
            <div>
                these are ur new pics !
            </div>);
        // return <>
        //     {   }
        // </>
    }

    return (<ContentPage>
        <div className='homebar'>
            <h1>Home</h1>
            <button style={{ width: "150px" }} onClick={() => auth.signOut()}> Sign out </button></div>
        <div className='dash'>
            <form ref={form}>
                <label>
                    Metadata
                    <input type="text" placeholder='Name' required></input>
                    <textarea type="text" placeholder='Description'></textarea>
                    <input type="text" placeholder='Project URL'></input>
                </label>
                {/* <button onClick={() => setPics(count => count + 1)} type="button">Add Pictures</button> */}
                <label>
                    Images
                    <input type="file" placeholder='Image' accept='image/*'></input>
                    <input type="text" placeholder='Social Media URL'></input>
                    <button style={{ width: "50%" }} type='button'>Add Image</button>

                </label>
                <label>
                    Submit
                    <button style={{ width: "50%" }} type='submit'>Submit Post</button>
                </label>
            </form>
            <Pics />
        </div>
    </ContentPage>);
}

export function Dashboard({ user, setUser }) {
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [])


    return (<ContentPage>
        {user ? <Home /> : <Login />}
    </ContentPage>);
}

const ContentPage = styled.div`
    width: 100%;
    height: 100%;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
        color: var(--black )!important;
    .homebar{
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .dash{
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        gap: 10vw;
        height: 100%;
        width: 100%;
    }

    input,textarea{
        padding: 0 5px;
        font-size: 16px;
        height: 40px;
        background-color: transparent !important;
        border: 1px solid var(--blue);
            border-radius: 5px;
    }
    button{
        display: block;
        cursor: pointer;
        width: 100%;
            padding: 5px 10px !important;
            margin: 10px auto;
            -webkit-appearance: none;
            color: var(--offwhite);
        border: none;
            background-color: var(--blue) !important;
            border-radius: 5px;
    }
    form{
        padding: 20px;
        overflow-y: scroll;
        height: 100%;
    display: flex;
    flex-direction: column !important;
    width: fit-content;
    justify-content: space-evenly;
    row-gap: 20px;

    label{
    row-gap: 20px;
        display: flex;
        flex-direction: column;
    }
    }
`
