import { fetchAUser, fetchAllUser,createAUser,updateAUser,cleanUpUserReducer} from "../../redux/reducers/userReducer"
import { newUser, updateUser } from "../data/users"
import userServer from "../servers/userServer"
import store from "../shared/store"

beforeEach(() => {
    store.dispatch(cleanUpUserReducer());
})

beforeAll(() => {
    userServer.listen()
})

afterAll(() => {
    userServer.close()
})

describe("Test userReducer", () => {
    test("Check initial state", () => {
        expect(store.getState().userReducer).toEqual({
            users: [],
            checkemail: false,
            loading: false,
            error: "",
            authenticate: false 
        })
    })
    test("Check fetchAllUser", async() => {
        await store.dispatch(fetchAllUser())
        expect(store.getState().userReducer.users.length).toBe(4)
    })
    test("Check fetchAUser", async() => {
        await store.dispatch(fetchAUser({userId: 1}))
        if(store.getState().userReducer.user) {
            expect(store.getState().userReducer.user?.name).toBe("john")
        }
    })
    test("Check if a new user is created", async () => {
        await store.dispatch(createAUser({userData: newUser}))
        if(store.getState().userReducer.user) {
            expect(store.getState().userReducer.user?.name).toBe("ali")
        }
    })
    test("Check if a new user is updated", async () => {
        await store.dispatch(updateAUser({userData: updateUser, userId: 1}))
        if(store.getState().userReducer.user) {
            expect(store.getState().userReducer.user?.name).toBe("lia")
        }
    })
})