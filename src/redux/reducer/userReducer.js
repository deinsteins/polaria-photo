import { SET_USER_ROLE } from "../actions/actions";

// State awal untuk peran pengguna
const initialState = {
  role: "",
};

// Reducer untuk menyimpan peran pengguna
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
