import {LOGIN} from "../types/dachaType";

const initialState = {
    isLoading: false,
    open: false,
    token: null,
    user : [],

};

export const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN){
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
};
