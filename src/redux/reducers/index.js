import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";

export const globalStore = combineReducers({
    productsReducer
})