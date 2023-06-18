import { createStore } from "redux";
import userReducer from "./reducer/userReducer";

// Buat store Redux dengan userReducer sebagai reducer
const store = createStore(userReducer);

export default store;
