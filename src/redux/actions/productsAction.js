
export const getProductsAction = (data) => {
    console.log("DATA DARI COMPONENT UI", data)
    return {
        // properti type dan payload itu ga boleh diganti2
        type: "GET_PRODUCTS", // penanda label mau disimpan ke reducer / cluster mana
        payload: data // pembawa data
    }
}