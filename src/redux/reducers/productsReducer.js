const INITIAL_STATE = {
    products: []
}

export const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { // type sama dengan label
        case "GET_PRODUCTS":
            console.log("DAPAT DATA PRODUCTS DARI ACTION", action.payload)
            return { ...state, products: action.payload } // ...state, products idem dengan INITIAL_STATE.products. payload barang yg ingin disimpan pada label tersebut
        default:
            return state;
    }
}