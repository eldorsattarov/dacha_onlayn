import {combineReducers} from "redux";
import {categoryReducer} from "./categoryReducer";
import {dachaReducer} from "./dachaReducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    dacha: dachaReducer
});
