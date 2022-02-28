import axios from "axios";
import {API_PATH} from "../../tools/constants";
import {DACHA} from "../types/dachaType";

export function updateState(data) {
    return {
        type: DACHA,
        payload: data
    }
}

export const getDacha = () => (dispatch) => {
    axios.get(API_PATH + "dacha")
        .then((res) => {
            console.log(res)
            dispatch(updateState({dacha: res.data.data.data}));
        })
}


export const getTopdacha = () => (dispatch) => {
    axios.get(API_PATH + "top-rated")
        .then((res) => {
            console.log(res);
            dispatch(updateState({topDacha: res.data.data, selectedTopDacha: []}));
        })
}

export const getId = (id) => (dispatch) => {

}

export const getIzbrannoe = () => (dispatch) => {
    let ids_array = JSON.parse(localStorage.getItem("locale"));
    let text = "";
     // text = ids_array.toString();
    for (let i = 0; i < ids_array.length; i++) {
   text += "ids_array[]=" + ids_array[i].toString() + "&"
    }
    console.log(text);
    console.log("ids = "+ids_array);
    // axios.get(API_PATH + `favourites?${"ids_array[]=" + ids_array}`)
    axios.get(API_PATH + `favourites?${text}`)
        .then((res) => {
            dispatch(updateState({izbran: res.data.data}));
        })
}
