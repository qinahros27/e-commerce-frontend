import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import  User from "../../types/User";
import { UserCredential } from "../../types/UserCredential";

const initialState: {
    user?: User ,
    users: User[],
    checkemail: boolean,
    loading: boolean,
    error: string,
    authenticate: boolean
} = {
    users: [],
    checkemail: false,
    loading: false,
    error: "",
    authenticate: false
}

export const fetchAllUser = createAsyncThunk(
  'fetchAllUser',
  async () => {
    try {
      const result = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users');
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const fetchAUser = createAsyncThunk(
    'fetchAUser',
    async ({ userId}: { userId: number }) => {
      try {
        const result = await axios.get<User>(`https://api.escuelajs.co/api/v1/users/${userId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
  );

export const createAUser = createAsyncThunk(
    'createAUser',
    async ({userData}: { userData: User }) => {
      try {
        const result = await axios.post<User>('https://api.escuelajs.co/api/v1/users/', userData);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const updateAUser = createAsyncThunk(
    'updateAUser',
    async ({userData, userId}: { userData: User , userId: number}) => {
      try {
        const result = await axios.put<User>(`https://api.escuelajs.co/api/v1/users/${userId}`, userData);
        console.log(result.data)
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);


export const authenticate = createAsyncThunk(
    "authenticate",
    async (access_token: string) => {
        try {
            const authentication = await axios.get<User>("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            return authentication.data
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const login = createAsyncThunk(
    "login",
    async ({ email, password }: UserCredential, { dispatch }) => {
        try {
            const result = await axios.post<{ access_token: string }>("https://api.escuelajs.co/api/v1/auth/login", { email, password })
            localStorage.setItem("token", result.data.access_token)
            const authentication = await dispatch(authenticate(result.data.access_token))
            return authentication.payload as User
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        emptyUserInfo: (state) => {
          state.user = {
            id: 0,
            email: '',
            password: '',
            name: '',
            role: "customer",
            avatar: ''
          }
        },
        cleanUpUserReducer: () => {
          return initialState
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllUser.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                  state.users = action.payload;    
              }
              state.loading = false
            })
            .addCase(fetchAUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload;
                    
                }
                state.loading = false
            })
            .addCase(fetchAUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAUser.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(createAUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                   state.user = action.payload;
                }
                state.loading = false
            })
            .addCase(createAUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createAUser.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(updateAUser.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                 state.user = action.payload;
              }
              state.loading = false
            })
            .addCase(updateAUser.pending, (state, action) => {
              state.loading = true
            })
            .addCase(updateAUser.rejected, (state, action) => {
              state.error = "Cannot fetch data"
            })
            .addCase(login.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                  state.user = action.payload;  
              }
              state.loading = false
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload
                    state.authenticate = true
                }
                state.loading = false
            })
    }
})

const userReducer = usersSlice.reducer
export const
    {
        emptyUserInfo,
        cleanUpUserReducer
    } = usersSlice.actions
export default userReducer