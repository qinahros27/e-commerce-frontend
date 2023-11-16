import { fetchAProduct, fetchAllProducts, createAProduct, updateAProduct, deleteAProduct,cleanUpProductReducer} from "../../redux/reducers/productsReducer"
import { invalidProduct, newProduct, updateProduct } from "../data/products"
import productServer from "../servers/productServer"
import store from "../shared/store"

beforeEach(() => {
    store.dispatch(cleanUpProductReducer());
})

beforeAll(() => {
    productServer.listen()
})

afterAll(() => {
    productServer.close()
})

describe("Test productsReducer", () => {
    test("Check initial state", () => {
        expect(store.getState().productsReducer).toEqual({
            product: {
                title: '',
                price: 0,
                description: '',
                categoryId: 0 ,
                images: []
            },
            productDetail: {
                id: 0,
                title: '',
                price: 0,
                description: '',
                category: {
                  id: 0,
                  name: '',
                  image: ''
                } ,
                images: []
            },
            products: [],
            deleteResponse: false,
            loading: false,
            error: ""
        })
    })
    test("Check fetchAllProducts", async() => {
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBe(4)
    })
    test("Check fetchAProduct", async() => {
        await store.dispatch(fetchAProduct({productId: 2}))
        expect(store.getState().productsReducer.productDetail.price).toBe(300)
    })
    test("Check if a new product is created", async () => {
        await store.dispatch(createAProduct({productData: newProduct}))
        expect(store.getState().productsReducer.productDetail.price).toBe(500)
    })
    test("Check if invalid product created", async () => {
        await store.dispatch(createAProduct({productData: invalidProduct}))
        expect(store.getState().productsReducer.products.length).toBe(0)
    })
    test("Check if a new product is updated", async () => {
        await store.dispatch(updateAProduct({productData: updateProduct, productId: 1}))
        expect(store.getState().productsReducer.productDetail.price).toBe(10);
    })
    test("Check deleteProduct", async() => {
        await store.dispatch(deleteAProduct({productId: 1}))
        expect(store.getState().productsReducer.deleteResponse).toBe(true);
    })
})