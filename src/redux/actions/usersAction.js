export const loginAction = (data) => {
    console.log("DATA USERS DARI COMP UI", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const updateCartAction = (data) => {
    return {
        type: "UPDATE_CART",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem("tokenIdUser")
    return {
        type: "LOGOUT"
    }
}

