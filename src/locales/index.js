import {LANGUAGE} from "../tools/constants";
import {uz} from "./UZ";
import {ru} from "./RU";

export const getLanguage = () => {
    return localStorage.getItem(LANGUAGE);
};
// console.log(localStorage.getItem(LANGUAGE))

export const getText = (word) => {
    return getLanguage() === "ru" ?
        ru[word] : uz[word]
};
