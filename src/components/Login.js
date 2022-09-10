import { ContentPage } from './Page';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export function Login() {
    // firebaseui.auth
    return (<ContentPage>
        <h1>Sign In</h1>
    </ContentPage>);
}