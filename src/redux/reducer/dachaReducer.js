import {DACHA} from "../types/dachaType";


const initialState = {
    dacha : [],
    topDacha : [],
    topTan : [],
    topTanImages : [],
    topTanCam : [],
    locale : [],
    izbran : [],
    ids_array : []
};

export const dachaReducer = (state = initialState,action)=>{
    if (action.types === DACHA){
        return{
            ...state,
            ...action.payload
        };
    }
    return state
};
