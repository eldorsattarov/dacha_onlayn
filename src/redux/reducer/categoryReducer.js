
import {CATEGORY} from "../types/dachaType";
const initialState = {
    category : [],
    selectedCategory : [],
    cat : [],
    open : false
}

export const categoryReducer = (state=initialState,action)=>{
    if (action.types = CATEGORY){
        return{
            ...state,
            ...action.payload
        }
    }
    return state
}
