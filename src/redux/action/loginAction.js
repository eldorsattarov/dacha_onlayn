

import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {toast} from "react-toastify";

export function login(event, errors, values) {
    return function (dispatch) {
        event.preventDefault();
        axios.post("https://work.bingo99.uz/api/rent-dacha", values)
            .then((res)=>{
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
