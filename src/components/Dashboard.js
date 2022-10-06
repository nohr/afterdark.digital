import { useEffect, useRef, useState } from 'react';
import { auth, signInWithGoogle } from '../utils/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { ref } from 'firebase/storage'
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import InstagramEmbed from 'react-instagram-embed';


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

const blobs = [];
function Home() {
    const snap = useSnapshot(state);
    const form = useRef(null);
    const file = useRef(null);
    const tikEmbed = useRef(null);
    const igEmbed = useRef(null);
    const [pics, setPics] = useState([]);
    let pic = [];

    function submitPortfolio(e) {
        e.prevent.default();
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        // const storageRef = ref(storage, `portfolio/${}`);
    }

    function handleFormat(file) {
        function removeItem(e) {
            // Remove from blob array
            const index = blobs.indexOf(file);
            if (index > -1) blobs.splice(index, 1);

            // Remove element from preview array (pics)
            const index1 = pic.findIndex(({ props }) => props.src === e.target.src);
            if (index1 >= 0) pic.splice(index1, 1);
            setPics(pics.concat(pic));
        }
        if (file.type && file.type.includes("image")) {
            pic.push(<img onClick={removeItem} className='previewimage' key={Math.random()} src={URL.createObjectURL(file)} />);
        }
        if (file.type && file.type.includes("video")) {
            pic.push(<video autoPlay muted loop onClick={removeItem} className='previewimage' key={Math.random()} src={URL.createObjectURL(file)}></video>);
        }

        setPics(pics.concat(pic));
    }

    function handleInsta(string) {
        pic.push(<InstagramEmbed
            url={string}
            // clientAccessToken='424952173042550|858fe119bd7bb8d6f2217837f3d6e4cc'
            maxWidth={500}
            hideCaption={false}
            containerTagName="div"
            injectScript
        />);
        setPics(pics.concat(pic));
    }
    function handleTikTok(string) {
        pic.push(<><iframe
            src={`https://www.tiktok.com/embed/${string}`}
            allowfullscreen
            scrolling="no"
            allow="encrypted-media;"
        ></iframe></>);
        setPics(pics.concat(pic));
    }

    function handleImage() {
        var files = file.current.files;

        for (let file of files) {
            let reader = new FileReader();
            reader.onload = function () {
                handleFormat(file);
            };
            reader.readAsDataURL(file);
            blobs.push(file);
        }

        if (file.current.files) {
            file.current.value = [];
        }
        if (igEmbed.current.value) {
            handleInsta(igEmbed.current.value)
        }
        if (tikEmbed.current.value) {
            handleTikTok(tikEmbed.current.value)
        }

        igEmbed.current.value = null;
        tikEmbed.current.value = null;
    }

    return (<ContentPage>
        <div className='homebar'>
            <h1>Dashboard</h1>
            <button style={{ width: "150px" }} onClick={() => auth.signOut()}> Sign out </button>
        </div>
        <div className='dash'>
            <form ref={form}>
                <div>
                    Metadata
                    <input type="text" placeholder='Name' required></input>
                    <textarea className='desc' type="text" placeholder='Description'></textarea>
                    <input type="text" placeholder='Project URL'></input>
                </div>
                <div>
                    Images
                    {snap.mobile && <Preview pics={pics} />}
                    <input multiple type="file" placeholder='Image' ref={file}></input>
                    <input type="text" placeholder='Instagram URL' ref={igEmbed}></input>
                    <input type="text" placeholder='TikTok ID' ref={tikEmbed}></input>
                    <button style={{ width: "50%" }} type='button' onClick={handleImage}>Add Image</button>
                </div>
                <div className='submit' style={{ border: "1px solid var(--blue)" }}>
                    <button style={{ width: "90%" }} type='submit'>Submit Post</button>
                </div>
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

    if (user) {
        return <Home />
    } else {
        return <Login />
    }
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
   form{
        @media screen and (max-width: 768px) {
            overflow-y: unset;
            width: 100%;
        }

        @media screen and (min-width: 768px) {
            overflow-y: scroll;
            width: 33vw;
        }

        padding: 20px;
        display: flex;
        flex-direction: column !important;
        justify-content: space-evenly;
        row-gap: 20px;

        div{
            row-gap: 20px;
            display: flex;
            flex-direction: column;
        }
    }
    input,textarea{
        &:focus{
            outline: none;
            border-width: 3px;
        }
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
        height: 30px;
        padding: 5px 10px !important;
        margin: 10px auto;
        -webkit-appearance: none;
        color: var(--offwhite);
        border: none;
        background-color: var(--blue) !important;
    }
 

    .submit{
        align-self: center;
        align-items: center;
        border-radius: 5px;
        width: 50%;
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
        position: relative;

        iframe{
            height: 80%;
            border: none;
        }
    }

    .previewimage{
        height: 400px;
        cursor: not-allowed;
        &:hover{
            opacity: 0.5;
        }
    }
`