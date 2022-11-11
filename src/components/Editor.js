import { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { db, signInWithGoogle } from '../utils/firebase/api';
import { state } from '../utils/state';
import { handleAddContent, handleDeleteContent, handleDeletePost } from '../utils/firebase/firebase.service';
import { clearSelectedName, generateElement, handleUploadPost } from '../utils/common';
// import InstagramEmbed from 'react-instagram-embed';

function Form({ name, setName, IDs, setIDs, Preview, content, setContent, cover, setCover }) {
    const snap = useSnapshot(state);
    const nameInput = useRef(null);
    const dataList = useRef(null);
    const fileInput = useRef(null);
    const [categories, setCategories] = useState([]);
    const [saved, setSaved] = useState(false);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');
    const [selectedFiles, setSelectedFiles] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [TikTokID, setTikTokID] = useState('');
    // const [InstaID, setInstaID] = useState('');
    const [load, setLoad] = useState('');
    const [confirm, setConfirm] = useState(false);

    // Hide mobile keyboard on selection
    useEffect(() => { if ((IDs.indexOf(name) !== -1) && nameInput.current) nameInput.current.blur(); }, [name, IDs, nameInput]);

    // Get and List document id and categories in datalist
    useEffect(() => {
        (async () => {
            const data = await getDocs(collection(db, "projects"));
            setIDs(data.docs.map(doc => doc.id));
            setCategories([...new Set(data.docs.map(doc => doc.data().category))]);
        })();
    }, [setIDs, setCategories]);

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
                    docSnap.data().date && setDate(formatDate(docSnap.data().date.toDate()));
                    setDescription(docSnap.data().description);
                    setURL(docSnap.data().url);
                    setCategory(docSnap.data().category);

                } else {
                    console.log("No such document!");
                }
            })();
        }
    }, [name, IDs])

    return <div className='formWrap'>{saved ? <> <p>Changes Saved!</p>
        <button onClick={() => window.location.reload(false)}>Post Again</button></ >
        : <form onSubmit={(e) => e.preventDefault()} className="secondary">
            <div className='section'>
                Metadata
                <input ref={nameInput} value={name} onChange={e => setName(e.target.value)} list="names" type="text" placeholder='Name' required></input>
                <button type='button' onClick={() => clearSelectedName(nameInput, dataList, setName, setCategory, setDescription, setDate, setContent, setTikTokID, setIsFilePicked, setURL, setSelectedFiles)}>Clear</button>
                <datalist id="names" ref={dataList}>
                    {IDs.map((name, index) => <option value={name} key={index} />)}
                </datalist>
                <input value={date} onChange={e => setDate(e.target.value)} type="date" required></input>
                <input value={category} onChange={e => setCategory(e.target.value)} list="categories" type="text" placeholder='Category' required></input>
                <datalist id="categories" ref={dataList}>
                    {categories.map((category, index) => <option value={category} key={index} />)}
                </datalist>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className='desc' type="text" placeholder='Description'></textarea>
                <input value={url} onChange={e => setURL(e.target.value)} type="text" placeholder='Project URL'></input>
            </div >
            <div className='section third'>
                Images
                {snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} setCover={setCover} />}
                <input onChange={e => {
                    e.target.files.length > 0 ? setIsFilePicked(true) : setIsFilePicked(false);
                    setSelectedFiles(e.target.files);
                }} multiple type="file" ref={fileInput}></input>
                {/* <input value={InstaID} onChange={e => setInstaID(e.target.value)} type="text" placeholder='Instagram URL'></input> */}
                <input value={TikTokID} onChange={e => setTikTokID(e.target.value)} type="text" placeholder='TikTok ID (ie. 7160455716745137413)' ></input>
                <div className='addContentWrap'>
                    <button className={`addContent ${(!isFilePicked) ? "disabled" : ""} ${(TikTokID !== "") ? "disabled" : ""}`} type='button' onClick={() => handleAddContent(selectedFiles, name, setLoad, content, setContent, setIsFilePicked, fileInput, TikTokID, setTikTokID)}>Add Content</button>
                    {load !== '' && <p>{load} uploaded</p>}
                </div></div>
            <button className={`submit ${(TikTokID !== "") || (isFilePicked) ? "disabled" : ""}`}
                onClick={() => handleUploadPost(name, category, description, date, url, content, cover, setSaved, setContent)} disabled={(TikTokID !== '') && (isFilePicked)} type='submit'>
                {IDs.indexOf(name) === -1 ? "Upload" : "Save"} Post</button>
            {IDs.indexOf(name) !== -1 && <button className={`${confirm ? "submit" : "delete"}`}
                onClick={() => setConfirm(!confirm)} type="button">{confirm ? "Cancel" : "Delete Post"}</button>}
            {confirm && <button className={`delete`} onClick={() => { handleDeletePost(name, setSaved); clearSelectedName(nameInput, dataList, setName, setCategory, setDescription, setDate, setContent, setTikTokID, setIsFilePicked, setURL, setSelectedFiles); }} type="button">Confirm</button>}
        </form>
    }</div>
}

function Preview({ content, setContent, name, IDs, setCover }) {
    const [preview, setPreview] = useState(`Upload and click 'Add Image' to preview.`);
    // set the cover image when the content changes
    useEffect(() => {
        if (content.length > 0) {
            // go through the content array, stop and set the first image as the cover
            for (let i = 0; i < content.length; i++) {
                if (content[i].type === "image") {
                    setCover(content[i].url);
                    break;
                }
            }
        } else {
            setCover('');
        }
    }, [content, name, setCover]);

    // Set the preview content when the document matches from the database
    useEffect(() => {
        // Set the content to the data from the database if the name matches an ID
        if (IDs.indexOf(name) !== -1) {
            // get the data from the database
            getDoc(doc(db, "projects", name)).then((doc) => {
                if (doc.exists()) {
                    setContent(doc.data().content);
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [name, IDs, setContent]);

    // Set the preview when the content array changes
    useEffect(() => {
        // change the preview when the name changes
        if (content.length > 0) {
            setPreview(content.map((item, index) => {
                return <div className='previewContent' key={index}> {generateElement(item, index)}
                    <button className={`delete`} style={{ width: "min-content" }} onClick={() => handleDeleteContent(item, name, content, setContent)} type='button'>Delete {item.type}</button>
                </div>
            }));
        } else {
            setPreview(`Upload and click 'Add Image' to preview.`);
        }
    }, [content, name, IDs, setContent]);

    return <div className='slideshow'>{preview}</div>
}

export function Editor({ user, marginTop }) {
    const snap = useSnapshot(state);
    const [IDs, setIDs] = useState([]);
    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [content, setContent] = useState([]);

    if (user) {
        return <ContentPage style={{ marginTop: marginTop }}>
            <div className='homebar'><h1>Editor</h1></div>
            <div className='dash'>
                <Form IDs={IDs} setIDs={setIDs} name={name} setName={setName} Preview={Preview} content={content} cover={cover} setCover={setCover} setContent={setContent} />
                {!snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} setCover={setCover} />}
            </div>
        </ContentPage>
    } else {
        return <ContentPage style={{ marginTop: marginTop }}>
            <h1>Editor</h1>
            <button style={{ width: "50%" }} onClick={signInWithGoogle}>Sign in with Google</button>
        </ContentPage>
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
        justify-content: center;
    }
    .dash{
        display: flex;
        flex-direction: row;
        width: 100%;
        
        @media screen and (max-width: 768px) {
            flex-direction: column;
            padding: 10px;
        }
    }
    .formWrap{
        @media screen and (max-width: 768px) {
            width: 100%;
        }
        @media screen and (min-width: 768px) {
            resize: horizontal;
            overflow-y: scroll;
            padding: 15px 0 15px 15px;
        }

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 20px;
        background-color: var(--bluealpha);
    }
    form{
        @media screen and (max-width: 768px) {
            justify-content: space-evenly;
        }

        @media screen and (min-width: 768px) {
            justify-content: flex-start;
            padding: 15px;
        }
        width: 100%;
        height: min-content;
        display: flex;
        flex-direction: column !important;
        row-gap: 20px;

        .section{
            row-gap: 20px;
            display: flex;
            flex-direction: column;
        }
         .third{
            padding: 10px;
         }
        .addContentWrap{
            column-gap: 30px;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            width: 100%;
            align-items: center;
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
        -webkit-appearance: none;
        color: var(--offwhite);
        border: none;
        border-radius: 0;
        border: 1px solid var(--blue);
        background-color: var(--blue) !important;

            &:hover{
                opacity: 50%;
                background-color: var(--bluealpha) !important;
            }
    }

    .disabled{
        border: 1px solid var(--grey) !important;
        background-color: var(--greyalpha) !important;
        color: var(--grey) !important;
        
        &:hover{
            opacity: 100% !important;
            background-color: var(--greyalpha) !important;
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
    }

    .submit, .addContent, .delete{
        align-self: flex-start;
        align-items: center;
        row-gap: 0;
        border: 1px solid var(--blue);
    }

    .delete{
            background-color: var(--red) !important;
            border: 1px solid var(--red) !important;

            &:hover{
                background-color:var(--redalpha) !important;
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

    .previewContent{
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