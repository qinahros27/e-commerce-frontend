import { fetchACategory,fetchAllCategories,createACategory,updateACategory,deleteACategory,cleanUpCategoryReducer} from "../../redux/reducers/categoryReducer"
import { newCategory,updateCategory } from "../data/categories"
import categoryServer from "../servers/categoryServer"
import store from "../shared/store"

beforeEach(() => {
    store.dispatch(cleanUpCategoryReducer());
})

beforeAll(() => {
    categoryServer.listen()
})

afterAll(() => {
    categoryServer.close()
})

describe("Test categoryReducer", () => {
    test("Check initial state", () => {
        expect(store.getState().categoriesReducer).toEqual({
            categories: [],
            deleteResponse: false,
            loading: false,
            error: ""
        })
    })
    test("Check fetchAllCategories", async() => {
        await store.dispatch(fetchAllCategories())
        expect(store.getState().categoriesReducer.categories.length).toBe(3)
    })
    test("Check fetchACategory", async() => {
        await store.dispatch(fetchACategory({categoryId: 1}))
        expect(store.getState().categoriesReducer.category?.name).toBe("A category")
    })
    test("Check if a new category is created", async () => {
        await store.dispatch(createACategory({categoryData: newCategory}))
        expect(store.getState().categoriesReducer.category?.name).toBe("new category")
    })
    test("Check if a new category is updated", async () => {
        await store.dispatch(updateACategory({categoryData: updateCategory, categoryId: 1}))
        expect(store.getState().categoriesReducer.category?.name).toBe("update category")
    })
    test("Check delete category", async() => {
        await store.dispatch(deleteACategory({categoryId:1}))
        expect(store.getState().categoriesReducer.deleteResponse).toBe(true);
    })
})