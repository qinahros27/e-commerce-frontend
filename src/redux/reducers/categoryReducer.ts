import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import  Category  from "../../types/Category";

const initialState: {
    category?: Category,
    categories: Category[],
    deleteResponse: boolean,
    loading: boolean,
    error: string
} = {
    categories: [],
    deleteResponse: false,
    loading: false,
    error: ""
}

export const fetchAllCategories = createAsyncThunk(
    'fetchAllCategories',
    async () => {
      try {
        const result = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories");
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const fetchACategory = createAsyncThunk(
    'fetchACategory',
    async ({ categoryId}: { categoryId: number }) => {
      try {
        const result = await axios.get<Category>(`https://api.escuelajs.co/api/v1/categories/${categoryId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const createACategory = createAsyncThunk(
    'createACategory',
    async ({categoryData}: { categoryData: Category }) => {
      try {
        const result = await axios.post<Category>('https://api.escuelajs.co/api/v1/categories/', categoryData);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const updateACategory = createAsyncThunk(
    'updateACategory',
    async ({categoryData, categoryId}: { categoryData: Category , categoryId: number}) => {
      try {
        const result = await axios.put<Category>(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, categoryData);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const deleteACategory = createAsyncThunk(
    'deleteACategory',
    async ({ categoryId}: { categoryId: number}) => {
      try {
        const result = await axios.delete(`https://api.escuelajs.co/api/v1/categories/${categoryId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      cleanUpCategoryReducer: () => {
        return initialState
      }
    } ,
    extraReducers: (build) => {
        build
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.categories = action.payload;
                    
                }
                state.loading = false
            })
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(fetchACategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.category = action.payload;
                    
                }
                state.loading = false
            })
            .addCase(fetchACategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchACategory.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(createACategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                   state.category = action.payload;
                }
                state.loading = false
            })
            .addCase(createACategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createACategory.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(updateACategory.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                 state.category = action.payload;
              }
              state.loading = false
            })
            .addCase(updateACategory.pending, (state, action) => {
              state.loading = true
            })
            .addCase(updateACategory.rejected, (state, action) => {
              state.error = "Cannot fetch data"
            })
            .addCase(deleteACategory.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                state.deleteResponse = action.payload;
              }
              state.loading = false
            })
            .addCase(deleteACategory.pending, (state, action) => {
              state.loading = true
            })
            .addCase(deleteACategory.rejected, (state, action) => {
              state.error = "Cannot fetch data"
            })    
    }
})

const categoriesReducer = categoriesSlice.reducer
export const { cleanUpCategoryReducer } = categoriesSlice.actions
export default categoriesReducer