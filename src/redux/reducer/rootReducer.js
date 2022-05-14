import {combineReducers} from "redux";
import {categoryReducer} from "./categoryReducer";
import {dachaReducer} from "./dachaReducer";
import {loginReducer} from "./loginReducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    dacha: dachaReducer,
    login : loginReducer
});
