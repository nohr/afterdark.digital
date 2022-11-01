import { proxy } from "valtio";

export const state = proxy({
    // Firebase
    data: [],
    // Mobile
    mobile: window.matchMedia("(max-width: 768px)").matches,
    menu: false,
})