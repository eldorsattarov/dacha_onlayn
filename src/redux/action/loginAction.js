import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {toast} from "react-toastify";
import {LOGIN} from "../types/dachaType";

export function updateState(data) {
    return {
        type: LOGIN,
        payload: data
    }
}

export function login(event, errors, values) {
    return function (dispatch) {
        event.preventDefault();
        axios.post("https://work.bingo99.uz/api/rent-dacha", values)
            .then((res) => {
                console.log(res);
                // localStorage.setItem(TOKEN_NAME, res.data.tokenType + " " + res.data.accessToken);
                // dispatch({type: ""});
                // history.push("/");
                toast.success(res.data.message);
            })
            .catch((error) => {
                toast.error("invalid");
            });
    }
}


export function onSubmitOne(event, errors, values) {
    console.log(values)
    return function (dispatch) {
        axios.post("https://work.bingo99.uz/api/login", values)
            .then((res) => {
                // console.log(res)
                // console.log(res.data.token)
                // setToken(res.data.token);
                // localStorage.setItem(TOKEN_NAME, res.data.accessToken);
                toast.success("Успешный !");
            })
            .catch(err => {
                toast.error("Ошибка ?");
            })
    }
}
