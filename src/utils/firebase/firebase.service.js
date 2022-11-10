import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { db, storage } from './api';
import { resizeImage } from '../resize';

export async function handleAddContent(selectedFiles, name, setLoad, content, setContent, setIsFilePicked, fileInput, TikTokID, setTikTokID) {
    let uploadTask = null;
    let newContent = [];
    // handle uploading multiple files with an ordered id
    for (let file of selectedFiles) {
        // check file size
        if (file.size > 10000000) {
            alert("File size is too large. Please upload a file less than 10MB.");
            return;
        }
        // resize file if it is an image
        if (file.type.includes("image")) {
            file = await resizeImage(file);
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

export function handleDeleteContent(item, name, content, setContent) {
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