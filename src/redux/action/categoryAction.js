
import axios from "axios";
import {CATEGORY} from "../types/dachaType";
import {API_PATH} from "../../tools/constants";

export function updateState(data) {
    return {
        type: CATEGORY,
        payload: data
    }
}

// export const getHome = () => (dispatch) =>{
//     axios.get("https://backend.ggic.uz/api/Yoshlar-ittifoqi/")
//         .then((res)=>{
//             console.log(res);
//             // dispatch(updateState({dataa : res.data.results}));
//         })
// }

export const getCategory = () => (dispatch) => {
    axios.get(API_PATH + "category")
        .then((res) => {
            dispatch(updateState({category: res.data.data}));
            // dispatch(updateState({selectedCategory: res.data.data[0]}));
        })
};
export const getCategoryPage = () => (dispatch) => {
    axios.get(API_PATH + "category")
        .then((res) => {
            // dispatch(updateState({cat: res.data.data}));
        })
};
