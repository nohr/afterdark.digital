import { useEffect, useRef, useState } from 'react';
import { auth, db, signInWithGoogle, storage } from '../utils/api';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
// import InstagramEmbed from 'react-instagram-embed';

function Login() {
    // firebaseui.auth
    return (<ContentPage>
        <h1>Editor</h1>
        <button style={{ width: "50%" }} onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    </ContentPage>);
}

function Form({ name, setName, IDs, setIDs, Preview, content, setContent }) {
    const snap = useSnapshot(state);
    const nameInput = useRef(null);
    const dataList = useRef(null);
    const fileInput = useRef(null);
    const [saved, setSaved] = useState(false);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');
    const [selectedFiles, setSelectedFiles] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [TikTokID, setTikTokID] = useState('');
    // const [InstaID, setInstaID] = useState('');

    // Hide mobile keyboard on selection
    useEffect(() => { if (IDs.indexOf(name) !== -1) nameInput.current.blur(); }, [name, IDs, nameInput]);

    // Get and List document id's in datalist
    useEffect(() => {
        (async () => {
            const data = await getDocs(collection(db, "projects"));
            setIDs(data.docs.map(doc => doc.id));
        })();
    }, [setIDs]);

    // Populate form with data from firestore when name matches
    useEffect(() => {
        //convert mm/dd/yyyy to yyyy-mm-dd
        function formatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        if (IDs.indexOf(name) !== -1) {
            (async () => {
                const docSnap = await getDoc(doc(db, "projects", name));
                if (docSnap.exists()) {
                    setDate(formatDate(docSnap.data().date.toDate()));
                    setDescription(docSnap.data().description);
                    setURL(docSnap.data().url);
                    setCategory(docSnap.data().category);

                } else {
                    console.log("No such document!");
                }
            })();
        }
    }, [name, IDs])

    function clearForm() {
        setName('');
        setCategory('');
        setDescription('');
        setDate('');
        setURL('');
    };

    function clearSelectedName() {
        clearForm();
        setContent([]);
        let options = dataList.current.options;

        for (var i = 0; i < options.length; i++) {
            options[i].selected = false;
        }
    };

    function handleAddContent() {
        // upload photos to Firebase
        if (selectedFiles === '') return;
        for (let file of selectedFiles) {
            let imageRef = ref(storage, `projects/${name} Media/${v4()}-${file.name}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    setContent(prev => [...prev, url])
                })
                alert(`${file.name} saved`);
            });
        };
        setSelectedFiles('');

        // Read and render file
        // if (selectedFiles !== []) {
        //     for (let file of selectedFiles) {
        //         let reader = new FileReader();
        //         reader.onload = () => {
        //             file.id = v4();
        //             if (file.type?.includes("image")) {
        //                 let img = <img alt={file.name} id={file.id} onClick={handleDeleteContent} className='previewimage' key={Math.random()} src={URL.createObjectURL(file)} />;
        //                 setThumbs(prev => [...prev, img]);
        //             }
        //             if (file.type?.includes("video")) {
        //                 let video = <video autoPlay muted loop id={file.id} onClick={handleDeleteContent} className='previewimage' key={Math.random()} src={URL.createObjectURL(file)}></video>;
        //                 setThumbs(prev => [...prev, video]);
        //             }
        //             setBlobs(prev => [...prev, file]);
        //         };
        //         reader.readAsDataURL(file);
        //     };
        //     fileInput.current.value = '';
        //     setIsFilePicked(false);
        // }

        // TODO: Fix Instagram API token?
        // if (InstaID !== '') {
        //     setThumbs(prev => [...prev, <InstagramEmbed clientAccessToken='511621404189406|34f272ef8ab7e9a37748b5b3054b61ea'
        //         key={Math.random()} url={string} maxWidth={500} hideCaption={false} containerTagName="div" injectScript />]);
        //     setBlobs(prev => [...prev, InstaID]);
        //     setInstaID('');
        // }

        // Handle TikTok embeds
        // if (TikTokID !== '') {
        //     setThumbs(prev => [...prev, <iframe src={`https://www.tiktok.com/embed/${TikTokID}`} title={TikTokID} key={Math.random()} allow-scripts="true"
        //         sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe>]);
        //     setBlobs(prev => [...prev, TikTokID]);
        //     setTikTokID('');
        // }
    };

    async function handleDeletePost() {
        setSaved(true);
        clearSelectedName();
        await deleteDoc(doc(db, "projects", name));
    };

    async function uploadData() {
        // Add or Edit Firestore doc 
        await setDoc(doc(db, "projects", name), {
            name: name,
            date: Timestamp.fromMillis(new Date(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2]).getTime()),
            category: category,
            description: description,
            url: url
        });
    };

    function handleUploadPost() {
        if (name !== '') {
            uploadData();
            setSaved(true);
        }
    };

    const [really, setReally] = useState(false);
    return <>{saved ? <div>
        Changes Saved!
        <button onClick={() => window.location.reload(false)}>Post Again</button>
    </div > : <form onSubmit={(e) => e.preventDefault()} className="secondary">
        <div>
            Metadata
            <input ref={nameInput} value={name} onChange={e => setName(e.target.value)} list="names" type="text" placeholder='Name' required></input>
            <button type='button' onClick={clearSelectedName}>Clear</button>
            <datalist id="names" ref={dataList}>
                {IDs.map((name, index) => <option value={name} key={index} />)}
            </datalist>
            <input value={date} onChange={e => setDate(e.target.value)} type="date"></input>
            <input value={category} onChange={e => setCategory(e.target.value)} type="text" placeholder='Category' required></input>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className='desc' type="text" placeholder='Description'></textarea>
            <input value={url} onChange={e => setURL(e.target.value)} type="text" placeholder='Project URL'></input>
        </div>
        <div>
            Images
            {snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} />}
            <input onChange={e => {
                e.target.files.length > 0 ? setIsFilePicked(true) : setIsFilePicked(false);
                setSelectedFiles(e.target.files);
            }} multiple type="file" ref={fileInput}></input>
            {/* <input value={InstaID} onChange={e => setInstaID(e.target.value)} type="text" placeholder='Instagram URL'></input> */}
            <input value={TikTokID} onChange={e => setTikTokID(e.target.value)} type="text" placeholder='TikTok ID' ></input>
            <div className={`addContent ${(!isFilePicked) ? "disabled" : ""} ${(TikTokID !== "") ? "disabled" : ""}`}>
                <button type='button' onClick={handleAddContent}>Add Content</button>
            </div>
        </div>
        <div className={`submit ${(TikTokID !== "") || (isFilePicked) ? "disabled" : ""}`}>
            <button onClick={handleUploadPost} disabled={(TikTokID !== '') && (isFilePicked)} type='submit'>{IDs.indexOf(name) === -1 ? "Upload" : "Save"} Post</button>
        </div>
        {IDs.indexOf(name) !== -1 && <div className={`${really ? "addContent" : "delete"}`}>
            <button onClick={() => setReally(!really)} type="button">{really ? "Cancel" : "Delete Post"}</button>
        </div>}
        {really && <div className={`delete`}>
            <button onClick={() => handleDeletePost()} type="button">Delete It</button>
        </div>}
    </form>
    }</>
}

function Preview({ content, setContent, name, IDs }) {
    const [preview, setPreview] = useState(`Upload and click 'Add Image' to preview.`);

    function handleDeleteContent(e) {
        // Remove Preview
        e.currentTarget.parentNode.remove();
        // delete the file from storage
        let filename = e.currentTarget.previousSibling.src.split("%2F")[2].split("?")[0];
        filename = filename.replace(/%20/g, " ").replace(/%2C/g, ",").replace(/%3A/g, ":").replace(/%3B/g, ";").replace(/%3D/g, "=").replace(/%3F/g, "?").replace(/%40/g, "@").replace(/%26/g, "&");
        const fileToDeleteRef = ref(storage, `projects/${name} Media/${filename}`);
        deleteObject(fileToDeleteRef);
        // Remove from content array
        setContent(prev => prev.filter(item => item !== filename));
    }

    // Set the preview content when the document matches
    useEffect(() => {
        if (IDs.indexOf(name) !== -1) {
            setContent([]);
            // create URL 
            let imageListRef = ref(storage, `projects/${name} Media/`);
            listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setContent(prev => [...prev, url]);
                    })
                })
            });
        }

        // return () => {
        //     setContent([]);
        // }
    }, [name, IDs, setContent]);

    // Set the preview when the content array changes
    useEffect(() => {
        // change the preview when the name changes
        if (IDs.indexOf(name) !== -1) {
            setPreview(content.map((item, index) => <div key={index} className='previewimage'>
                <img src={item} alt={item} />
                <button onClick={handleDeleteContent} type='button'>Delete</button>
            </div>));
        }
    }, [content, name, IDs]);
    useEffect(() => {
        // when there is no content, show the default preview
        if (content.length === 0) {
            setPreview(`Upload and click 'Add Image' to preview.`);
        }
    }, [name, IDs]);


    return <div className='slideshow'>{preview}</div>
}

function Home() {
    const snap = useSnapshot(state);
    const [content, setContent] = useState([]);
    const [IDs, setIDs] = useState([]);
    const [name, setName] = useState('');

    return (<ContentPage>
        <div className='homebar'>
            <h1>Editor</h1>
            <button style={{ width: "150px" }} onClick={() => auth.signOut()}> Sign out </button>
        </div>
        <div className='dash'>
            <Form
                IDs={IDs}
                setIDs={setIDs}
                name={name}
                setName={setName}
                Preview={Preview}
                content={content}
                setContent={setContent}
            />
            {!snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} />}
        </div>
    </ContentPage>);
}

export function Editor({ user, setUser }) {
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        })
    }, [auth, setUser])

    if (user) {
        return <Home />
    } else {
        return <Login />
    }
}

const ContentPage = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--black )!important;
    justify-content: flex-start;

    .homebar{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
            justify-content: space-evenly;
            overflow-y: unset;
            width: 100%;
        }

        @media screen and (min-width: 768px) {
            resize: horizontal;
            justify-content: flex-start;
            overflow-y: scroll;
            width: 33vw;
        }

        padding: 20px;
        display: flex;
        flex-direction: column !important;
        row-gap: 20px;
        margin-bottom: 40px;

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
        /* border-radius: 5px; */
        
        @media screen and (max-width: 768px) {
        width: 100%;
        }
    }
    input{
        height: 40px;
    }
    textarea{
        resize: vertical;
        height: 120px;
        @media screen and (max-width: 768px) {
        height: 80px;
        }
    }
    button{
        white-space: nowrap;
        display: block;
        cursor: pointer;
        width: 100%;
        height: 30px;
        padding: 5px 10px !important;
        /* margin: 10px auto; */
        -webkit-appearance: none;
        color: var(--offwhite);
        border: none;
        border-radius: 0;
        background-color: var(--blue) !important;

            &:hover{
                opacity: 50%;
            }
    }
    .disabled{
        opacity: 50%;
        border: 1px solid var(--grey) !important;
        button{
            background-color: var(--grey) !important;
        }
    }
    .addContent{
            width: min-content;
        button{
            width: 100%;
        }
    }

    .submit{
        width: 100%;
        button{
            width: 100%;
        }
    }

    .submit, .addContent, .delete{
        align-self: flex-start;
        align-items: center;
        padding: 0 !important;
        row-gap: 0;
        border: 1px solid var(--blue);
        /* border-radius: 5px; */
    }

    .delete{
        border-color: #dd4444 !important;
        button{
            background-color: #dd4444 !important;
        }
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
        padding: 0 30px;

        iframe{
            height: 80%;
            border: none;
        }
    }

    .previewimage{
        img, video, iframe{
            height: 70vh;
        }
        @media screen and (max-width: 768px) {
        img, video, iframe{
            height: 50vh;
        }
        }

        button{
            width: 25%;
            margin: 0 auto;
        &:hover{
            opacity: 0.5;
        }
    }
    }
`