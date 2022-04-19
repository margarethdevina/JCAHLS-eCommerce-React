export const loginAction = (data) => {
    console.log("DATA USERS DARI COMP UI", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}