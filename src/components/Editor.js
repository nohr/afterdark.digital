import { useEffect, useRef, useState } from 'react';
import { db, signInWithGoogle, storage } from '../utils/api';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { state } from '../utils/state';
import { Navigate } from 'react-router';
// import InstagramEmbed from 'react-instagram-embed';

function Login() {
    return (<ContentPage>
        <h1>Editor</h1>
        <button style={{ width: "50%" }} onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    </ContentPage>);
}

function Form({ name, setName, IDs, setIDs, Preview, content, setContent, setPath, cover, setCover }) {
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
    let newContent = [];
    let uploadTask = null;

    // Hide mobile keyboard on selection
    useEffect(() => { if (IDs.indexOf(name) !== -1) nameInput.current.blur(); }, [name, IDs, nameInput]);

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

    function clearForm() {
        setName('');
        setCategory('');
        setDescription('');
        setDate('');
        setURL('');
        setContent([]);
        setPath('');
        setSelectedFiles('');
        setIsFilePicked(false);
        setTikTokID('');
        // setInstaID('');
    };

    function clearSelectedName() {
        if (nameInput.current) {
            clearForm();
            setContent([]);
            let options = dataList.current.options;

            for (var i = 0; i < options.length; i++) {
                options[i].selected = false;
            }
        }
    };

    function handleAddContent() {
        // handle uploading multiple files with an ordered id
        for (let file of selectedFiles) {
            // keep track of file upload progress
            let progress = 0;
            // create a unique id for the file
            const id = v4();
            // create a reference to the storage bucket location
            const storageRef = ref(storage, `projects/${name} Media/${id}-${file.name}`);
            // upload the file
            uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                // calculate the upload progress
                progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setLoad(`${progress}%`);
            }, (error) => {
                // catch errors
                console.log(error);
            }, () => {
                // get the download url when complete
                getDownloadURL(storageRef).then(downloadURL => {
                    // add the file to the array of files with an ordered id
                    newContent.push({ id, name: `${id}-${file.name}`, url: downloadURL, type: file.type.split('/')[0] });
                    // add the new content to the content array
                    setContent([...content, ...newContent]);
                    // update the firestore document
                    setDoc(doc(db, "projects", name), { content: [...content, ...newContent] }, { merge: true });
                    // reset the progress
                    setLoad('');
                    progress = 0;
                });
            });
        };

        // handle adding TikTok embed
        if (TikTokID !== '') {
            newContent.push({ id: v4(), url: TikTokID, type: 'tiktok' });
            // append the new content to the state  
            setContent([...content, ...newContent]);
            // update the firestore document
            setDoc(doc(db, "projects", name), { content: [...content, ...newContent] }, { merge: true });
            setTikTokID('');
        }

        // handle adding Instagram embed
        // if (InstaID !== '') {
        //     newContent.push({ id: v4(), url: InstaID, type: 'instagram' });
        //     // append the new content to the state
        //     setContent([...content, ...newContent]);
        //     setInstaID('');
        // }

        setIsFilePicked(false);
        fileInput.current.value = '';
        newContent = [];
    };

    async function handleDeletePost() {
        setSaved(true);
        clearSelectedName();
        await deleteDoc(doc(db, "projects", name));
        // delete firebase storage folder
        // await deleteObject(ref(storage, `projects/${name} Media`));
        let storageRef = ref(storage, `projects/${name} Media`);
        listAll(storageRef).then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef);
            });
        });

    };

    async function uploadData() {
        // generate a pathname for the project
        let path = name.toLowerCase().replace(/ /g, '-');
        let timestamp = Timestamp.fromMillis(new Date(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2]).getTime());
        // Add or Edit Firestore doc 
        await setDoc(doc(db, "projects", name), {
            path: path,
            name: name,
            date: timestamp,
            category: category,
            description: description,
            url: url,
            cover: cover,
            content: content
        }, { merge: true });
    };

    function handleUploadPost() {
        if (name !== '', category !== '', date !== '') {
            uploadData();
            setContent([]);
            setSaved(true);
        }
    };

    // a function that resizes the div on drag
    // function resizeDiv(e) {
    //     let div = document.getElementById('resize');

    //     // get the mouse position
    //     let mouseX = e.clientX;
    //     let mouseY = e.clientY;

    //     // get the div position
    //     let divX = div.offsetLeft;
    //     let divY = div.offsetTop;

    //     // get the div size
    //     let divWidth = div.offsetWidth;
    //     let divHeight = div.offsetHeight;

    //     // calculate the new div size
    //     let newWidth = divWidth + (mouseX - divX);
    //     let newHeight = divHeight + (mouseY - divY);

    //     // set the new div size
    //     div.style.width = newWidth + 'px';
    //     div.style.height = newHeight + 'px';
    // };

    const [confirm, setConfirm] = useState(false);
    return <div className='formWrap'>{saved ? <> <p>Changes Saved!</p>
        <button onClick={() => window.location.reload(false)}>Post Again</button></ >
        : <form onSubmit={(e) => e.preventDefault()} className="secondary">
            <div className='section'>
                Metadata
                <input ref={nameInput} value={name} onChange={e => setName(e.target.value)} list="names" type="text" placeholder='Name' required></input>
                <button type='button' onClick={clearSelectedName}>Clear</button>
                <datalist id="names" ref={dataList}>
                    {IDs.map((name, index) => <option value={name} key={index} />)}
                </datalist>
                <input value={date} onChange={e => setDate(e.target.value)} type="date" required></input>
                {/* TODO: Add datalist for saved categories */}
                <input value={category} onChange={e => setCategory(e.target.value)} list="categories" type="text" placeholder='Category' required></input>
                <datalist id="categories" ref={dataList}>
                    {categories.map((category, index) => <option value={category} key={index} />)}
                </datalist>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className='desc' type="text" placeholder='Description'></textarea>
                <input value={url} onChange={e => setURL(e.target.value)} type="text" placeholder='Project URL'></input>
            </div >
            <div className='section third'>
                Images
                {snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} setPath={setPath} setCover={setCover} />}
                <input onChange={e => {
                    e.target.files.length > 0 ? setIsFilePicked(true) : setIsFilePicked(false);
                    setSelectedFiles(e.target.files);
                }} multiple type="file" ref={fileInput}></input>
                {/* <input value={InstaID} onChange={e => setInstaID(e.target.value)} type="text" placeholder='Instagram URL'></input> */}
                <input value={TikTokID} onChange={e => setTikTokID(e.target.value)} type="text" placeholder='TikTok ID (ie. 7160455716745137413)' ></input>
                <div className='addContentWrap'>
                    <button className={`addContent ${(!isFilePicked) ? "disabled" : ""} ${(TikTokID !== "") ? "disabled" : ""}`} type='button' onClick={handleAddContent}>Add Content</button>
                    {/* {load !== '' && <button onClick={() => uploadTask.cancel()} className='addContent delete' type='button'>Stop</button>} */}
                    {load !== '' && <p>{load} uploaded</p>}
                </div></div>
            <button className={`submit ${(TikTokID !== "") || (isFilePicked) ? "disabled" : ""}`}
                onClick={handleUploadPost} disabled={(TikTokID !== '') && (isFilePicked)} type='submit'>
                {IDs.indexOf(name) === -1 ? "Upload" : "Save"} Post</button>
            {IDs.indexOf(name) !== -1 && <button className={`${confirm ? "submit" : "delete"}`}
                onClick={() => setConfirm(!confirm)} type="button">{confirm ? "Cancel" : "Delete Post"}</button>}
            {confirm && <button className={`delete`} onClick={() => handleDeletePost()} type="button">Confirm</button>}
        </form>
    }</div>
}

function Preview({ content, setContent, name, IDs, setPath, setCover }) {
    const [preview, setPreview] = useState(`Upload and click 'Add Image' to preview.`);
    // set the cover image when the content changes
    useEffect(() => {
        if (content.length > 0) {
            // go through the content array and stop and set the first image or video
            for (let i = 0; i < content.length; i++) {
                if (content[i].type === "image") {
                    // generate a thumbnail from the image
                    let thumb = content[i].name.split('.');
                    thumb[thumb.length - 2] += '_1080x1080';
                    thumb = thumb.join('.');
                    console.log(thumb);
                    console.log(thumb);
                    setPreview(thumb);
                    // setCover((content[i].url));
                    break;
                }
            }
        } else { setCover(''); }
    }, [content]);

    // Set the preview content when the document matches from the database
    useEffect(() => {
        // Set the content to the data from the database if the name matches an ID
        if (IDs.indexOf(name) !== -1) {
            // get the data from the database
            getDoc(doc(db, "projects", name)).then((doc) => {
                if (doc.exists()) {
                    setPath(doc.data().path);
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
        function handleDeleteContent(item) {
            // remove the file from storage if its a image or video
            if (item.type === 'image' || item.type === 'video') {
                deleteObject(ref(storage, `projects/${name} Media/${item.name}`));
            }
            // remove the item from the content array
            setContent(content.filter(i => i !== item));
            // update the firestore doc
            setDoc(doc(db, "projects", name), {
                content: content.filter(i => i !== item)
            }, { merge: true });
        };

        // change the preview when the name changes
        setPreview(content.map((item, index) => {
            const element = item.type === 'image' ? <img src={item.url} alt={item.name} key={index} /> :
                item.type === 'video' ? <video src={item.url} alt={item.name} key={index} controls></video> :
                    item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={Math.random()} allow-scripts="true"
                        sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                        <p>{item.type} type not supported</p>;

            return <div className='previewimage' key={index}> {element}
                <button className={`delete`} style={{ width: "min-content" }} onClick={() => handleDeleteContent(item, index)} type='button'>Delete {item.type}</button>
            </div>
        }));
    }, [content, name, IDs]);

    // when there is no content, show the default preview
    useEffect(() => {
        if (content.length === 0) {
            setPreview(`Upload and click 'Add Image' to preview.`);
        }

    }, [name, IDs, content]);

    return <div className='slideshow'>{preview}</div>
}

export function Editor({ user }) {
    const snap = useSnapshot(state);
    const [path, setPath] = useState('');
    const [IDs, setIDs] = useState([]);
    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [content, setContent] = useState([]);

    if (user) {
        return <ContentPage>
            <div className='homebar'>
                <h1>Editor</h1>
            </div>
            <div className='dash'>
                <Form
                    IDs={IDs}
                    setIDs={setIDs}
                    name={name}
                    setName={setName}
                    Preview={Preview}
                    content={content}
                    cover={cover}
                    setCover={setCover}
                    setContent={setContent}
                    setPath={setPath}
                />
                {!snap.mobile && <Preview name={name} IDs={IDs} content={content} setContent={setContent} setPath={setPath} setCover={setCover} />}
            </div>
            {/* {path !== '' && <Navigate to={`/editor/${path}`} />} */}
        </ContentPage>
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
    overflow-y: scroll;

    .homebar{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .dash{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        
        @media screen and (max-width: 768px) {
            /* overflow-y: scroll; */
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
            /* width: 50vw !important; */
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
            overflow-y: unset;
        }

        @media screen and (min-width: 768px) {
            justify-content: flex-start;
            padding: 15px;
            width: 100%;
        }
        /* width: 100%; */
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
        /* padding: 0 !important; */
        row-gap: 0;
        border: 1px solid var(--blue);
        /* border-radius: 5px; */
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