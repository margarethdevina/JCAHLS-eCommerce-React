const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    password: "",
    role: "",
    cart: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DPT DATA USERS DR ACTION", action.payload)
            return { 
                ...state, ...action.payload //karena pakai spread operator properti yg sama akan langsung diisi
            }
        default:
            return state;
    }
}