import styled from "styled-components";

export function Shop() {
    // firebaseui.auth
    return (<ContentPage>
        <h1>Shop</h1>
    </ContentPage>);
}


const ContentPage = styled.div`
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    margin: auto 0;
    
    h1{
        width: min-content;
        margin: 0 auto;
    }

    img{
        width: 100%;
    }
`