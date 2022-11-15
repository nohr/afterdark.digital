import { proxy } from "valtio";

export const state = proxy({
    // Firebase
    data: [],
    about:'',
    // Mobile
    mobile: window.matchMedia("(max-width: 768px)").matches,
    menu: false,
    categories: [],
    load: true,
})