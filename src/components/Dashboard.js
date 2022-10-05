import { useEffect, useRef, useState } from 'react';
import { auth, signInWithGoogle } from '../utils/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { ref } from 'firebase/storage'
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';


function Login() {
    // firebaseui.auth
    return (<ContentPage>
        <h1>Dashboard</h1>
        <button style={{ width: "50%" }} onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    </ContentPage>);
}
function Preview({ pics }) {
    const [preview, setPreview] = useState(`Upload and click 'Add Image' to preview.`);

    useEffect(() => {
        if (pics.length === 0) {
            setPreview(`Upload and click 'Add Image' to preview.`);
        } else {
            setPreview(pics.map(value => value));
        }
    }, [pics]);

    return (<div className='slideshow'>{preview}</div>);
}

function Home() {
    const snap = useSnapshot(state);
    const form = useRef(null);
    const file = useRef(null);
    const embed = useRef(null);
    const [pics, setPics] = useState([]);
    let blobs = [];
    let pic = [];
    // const [embeds, setEmbeds] = useState([]);
    const reader = new FileReader();

    function submitPortfolio(e) {
        e.prevent.default();
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        // const storageRef = ref(storage, `portfolio/${}`);
    }

    function handleImage() {
        reader.onload = function (e) {
            pic.push(<img className='previewimage' key={Math.random()} src={e.target.result} />);
            setPics(pics.concat(pic));
        }
        for (let i = 0; i < file.current.files.length; i++) {
            reader.readAsDataURL(file.current.files.item(i));
            blobs.push(file.current.files.item(i));
        }

        if (file.current.files) {
            file.current.value = [];
        }
        embed.current.value = null;
        console.log(blobs);
    }

    useEffect(() => {

    }, [])


    return (<ContentPage>
        <div className='homebar'>
            <h1>Dashboard</h1>
            <button style={{ width: "150px" }} onClick={() => auth.signOut()}> Sign out </button>
        </div>
        <div className='dash'>
            <form ref={form}>
                <label>
                    Metadata
                    <input type="text" placeholder='Name' required></input>
                    <textarea className='desc' type="text" placeholder='Description'></textarea>
                    <input type="text" placeholder='Project URL'></input>
                </label>
                <label>
                    Images
                    {snap.mobile && <Preview pics={pics} />}
                    <input type="file" placeholder='Image' accept='image/*' ref={file}></input>
                    <input type="text" placeholder='Social Media URL' ref={embed}></input>
                    <button style={{ width: "50%" }} type='button' onClick={handleImage}>Add Image</button>

                </label>
                <label className='submit' style={{ border: "1px solid var(--blue)" }}>
                    Submit
                    <button style={{ width: "50%" }} type='submit'>Submit Post</button>
                </label>
            </form>
            {!snap.mobile && <Preview pics={pics} />}
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
                setUser(false);
            }
        })
    }, [])


    return (<ContentPage>
        {user ? <Home /> : <Login />}
    </ContentPage>);
}

const ContentPage = styled.div`
    width: 100vw;
    height: 100%;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--black )!important;
    justify-content: flex-start;

    .homebar{
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .dash{
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        @media screen and (max-width: 768px) {
            overflow-y: scroll;
            flex-direction: column;
        }
    }

    input,textarea{
        padding: 0 5px;
        font-size: 16px;
        background-color: transparent !important;
        border: 1px solid var(--blue);
        border-radius: 5px;
        
        @media screen and (max-width: 768px) {
        width: 100%;
        }
    }
    input{
        height: 40px;
    }
    textarea{
        height: 120px;
        @media screen and (max-width: 768px) {
        height: 80px;
        }
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
    }
    form{
        @media screen and (max-width: 768px) {
            overflow-y: unset;
        }

        @media screen and (min-width: 768px) {
            width: 640px;
        }

        padding: 20px;
        overflow-y: scroll;
        /* height: 100%; */
        width: 100%;
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

    .submit{
        align-self: center;
        align-items: center;
        border-radius: 5px;
        width: 70%;
        row-gap: 0;
    }
    
    .slideshow{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: scroll !important;
        align-items: center;
    }

    .previewimage{
        height: 300px;
    }
`