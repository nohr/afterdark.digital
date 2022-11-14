/* eslint-disable no-loop-func */
import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { db, storage } from './api';
// import { convertToWebp } from '../common';

export async function handleAddContent(selectedFiles, name, setLoad, content, setContent, setIsFilePicked, fileInput, TikTokID, setTikTokID) {
    let uploadTask = null;
    let newContent = [];
    // handle uploading multiple files with an ordered id
    for (let file of selectedFiles) {
        // check file size
        if (file.size > 10485760) {
            alert("File size is too large. Please upload a file less than 10MB.");
            return;
        }
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
            // // get the download url of the resized img when complete
            // if (file.type.includes("image")) {
            //     getDownloadURL(ref(storage, `projects/${name} Media/${id}-${convertToWebp(file.name)}`)).then(downloadURL => {
            //         handleGetContent(name, setContent, newContent, content, id, convertToWebp(file.name), "image", downloadURL, setLoad, progress);
            //     });
            // } else {
            //     getDownloadURL(ref(storage, `projects/${name} Media/${id}-${file.name}`)).then(downloadURL => {
            //         handleGetContent(name, setContent, newContent, content, id, file.name, file.type, downloadURL, setLoad, progress);
            //     });
            // }
            getDownloadURL(ref(storage, `projects/${name} Media/${id}-${file.name}`)).then(downloadURL => {
                handleGetContent(name, setContent, newContent, content, id, file.name, file.type, downloadURL, setLoad, progress);
            });
            setLoad("10MB Max");
            progress = 0;
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

// wait for the firebase extension to finish and grab the download url
function handleGetContent(name, setContent, newContent, content, id, filename, filetype, downloadURL) {
    // add the file to the array of files with an ordered id
    newContent.push({ id, name: `${id}-${filename}`, url: downloadURL, type: filetype.split('/')[0] });
    // add the new content to the content array
    setContent([...content, ...newContent]);
    // update the firestore document
    setDoc(doc(db, "projects", name), { content: [...content, ...newContent] }, { merge: true });
};


export function handleDeleteContent(item, name, content, setContent) {
    // // remove the file from storage if its a image or video
    // if (item.type === 'image') {
    //     deleteObject(ref(storage, `projects/${name} Media/${convertToWebp(item.name)}`));
    // } else if (item.type === 'video') {
    //     deleteObject(ref(storage, `projects/${name} Media/${item.name}`));
    // }
    deleteObject(ref(storage, `projects/${name} Media/${item.name}`));
    // remove the item from the content array
    setContent(content.filter(i => i !== item));
    // update the firestore doc
    setDoc(doc(db, "projects", name), {
        content: content.filter(i => i !== item)
    }, { merge: true });
};

export async function handleDeletePost(name, setSaved) {
    setSaved(true);
    await deleteDoc(doc(db, "projects", name));
    // delete firebase storage folder
    listAll(ref(storage, `projects/${name} Media`)).then((res) => {
        res.items.forEach((itemRef) => {
            deleteObject(itemRef);
        });
    });
};

export async function uploadData(name, category, description, date, url, content, cover) {
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