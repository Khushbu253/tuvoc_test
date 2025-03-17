import axios from "axios";

const updateCartService = async (item) => {
    const todate =new Date().toISOString().slice(0, 10) 
    const body = { userId: 2, products: [{ productId: item.id  , quantity:item.quantity}] ,date:todate};
    await axios.put(`https://fakestoreapi.com/carts/2`, body)
}

const deleteCartProduct = async (item) => {
    await axios.delete(`https://fakestoreapi.com/carts/${item.id}`)
}


export { updateCartService, deleteCartProduct }