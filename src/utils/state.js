import { proxy } from "valtio";
import dummyData from '../dummyData.json'

export const state = proxy({
    // Firebase
    data: dummyData,
    // Mobile
    mobile: window.matchMedia("(max-width: 768px)").matches,
    menu: false,
})