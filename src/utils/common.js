import { uploadData } from "./firebase/firebase.service";

// convert firebase timestamp to date
export const convertDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
}

export function clearSelectedName(nameInput, dataList, setName, setCategory, setDescription, setDate, setContent, setTikTokID, setIsFilePicked, setURL, setSelectedFiles) {
    if (nameInput.current) {
        setName('');
        setCategory('');
        setDescription('');
        setDate('');
        setURL('');
        setContent([]);
        setSelectedFiles('');
        setIsFilePicked(false);
        setTikTokID('');
        // setInstaID('');

        let options = dataList.current.options;

        for (var i = 0; i < options.length; i++) {
            options[i].selected = false;
        }
    }
};

export function handleUploadPost(name, category, description, date, url, content, cover, setSaved, setContent) {
    if (name !== '' && category !== '' && date !== '') {
        uploadData(name, category, description, date, url, content, cover);
        setContent([]); setSaved(true);
    }
};

export function generateElement(item, index) {
    return item.type === 'image' ? <img src={item.url} alt={item.name} key={index} /> :
        item.type === 'video' ? <video src={item.url} alt={item.name} key={index} controls></video> :
            item.type === 'tiktok' ? <iframe src={`https://www.tiktok.com/embed/${item.url}`} title={item.url} key={Math.random()} allow-scripts="true"
                sandbox='allow-same-origin allow-scripts' scrolling="no" allow="encrypted-media;"></iframe> :
                <p>{item.type} type not supported</p>;
}

// export a function that changes the the string extension to a webp extension
export function convertToWebp(url) {
    let newUrl = url.split('.');
    newUrl[newUrl.length - 2] += '_1080x1080';
    newUrl[newUrl.length - 1] = 'webp';
    return newUrl.join('.');
}


//convert mm/dd/yyyy to yyyy-mm-dd
export function formatDate(date) {
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
