import {addItem,emptyCartReducer,updateQuantity,deleteItem} from "../../redux/reducers/cartReducer"
import store from "../shared/store"
import { cart1,cart2,cart3 } from "../data/cart";

beforeEach(() => {
    store.dispatch(emptyCartReducer());
})

describe("Test cartReducer", () => {
    test("Check initial state", () => {
        expect(store.getState().cartReducer).toEqual({
            cart: []
        })
    })
    test("Check add item", async() => {
        await store.dispatch(addItem(cart1))
        expect(store.getState().cartReducer.cart.length).toBe(1)
    })
    test("Check update quantity", async() => {
        await store.dispatch(addItem(cart1))
        await store.dispatch(updateQuantity({ id: 1, quantities: 5 }))
        expect(store.getState().cartReducer.cart[0].quantities).toBe(5)
    })
    test("Delete item", async() => {
        await store.dispatch(addItem(cart1))
        await store.dispatch(addItem(cart2))
        await store.dispatch(addItem(cart3))
        await store.dispatch(deleteItem(cart1))
        expect(store.getState().cartReducer.cart.length).toBe(2)
    })
    
});