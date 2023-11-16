import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import  Product  from "../../types/Product";
import ProductDetail from "../../types/ProductDetail";
import AddorEditProduct from "../../types/AddorEditProduct";

const initialState: {
    product: AddorEditProduct,
    productDetail: ProductDetail,
    products: Product[],
    deleteResponse: boolean,
    loading: boolean,
    error: string
} = {
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
}

export const fetchAllProducts = createAsyncThunk(
    'fetchAllProducts',
    async ({id, min,max}: { id?:number, min?:number, max?:number} = {}) => {
      try {
        if (min != undefined && max != undefined && id == undefined) {
          const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}`);
          return result.data
        }
        else if (min == undefined && max == undefined && id != undefined) {
          const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
          return result.data; 
        }
        else if (min != undefined && max != undefined && id != undefined) {
          const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}&categoryId=${id}`);
          return result.data; 
        }
        else {
          const result = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products");
          return result.data; // The returned result will be inside action.payload
        }
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const fetchAProduct = createAsyncThunk(
    'fetchAProduct',
    async ({ productId}: { productId: number }) => {
      try {
        const result = await axios.get<ProductDetail>(`https://api.escuelajs.co/api/v1/products/${productId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const createAProduct = createAsyncThunk(
    'createAProduct',
    async ({productData}: { productData: AddorEditProduct }) => {
      try {
        console.log(productData);
        const result = await axios.post<ProductDetail>('https://api.escuelajs.co/api/v1/products/', productData);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const updateAProduct = createAsyncThunk(
    'updateAProduct',
    async ({productData, productId}: { productData: AddorEditProduct , productId: number}) => {
      try {
        const result = await axios.put<ProductDetail>(`https://api.escuelajs.co/api/v1/products/${productId}`, productData);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const deleteAProduct = createAsyncThunk(
    'deleteAProduct',
    async ({ productId}: { productId: number}) => {
      try {
        const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);

export const productsinCategory = createAsyncThunk(
  'productsinCategory',
  async ({ categoryId}: { categoryId: number}) => {
    try {
      const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      cleanUpProductReducer: () => {
        return initialState
      }
    } ,
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.products = action.payload;
                    
                }
                state.loading = false
            })
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(fetchAProduct.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message;
                } else {
                    state.productDetail = action.payload;
                }
                state.loading = false
            })
            .addCase(fetchAProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAProduct.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(createAProduct.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                   state.productDetail = action.payload;
                }
                state.loading = false
            })
            .addCase(createAProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createAProduct.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(updateAProduct.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                  state.productDetail = action.payload;
              }
              state.loading = false
            })
            .addCase(updateAProduct.pending, (state, action) => {
              state.loading = true
            })
            .addCase(updateAProduct.rejected, (state, action) => {
              state.error = "Cannot fetch data"
            })
            .addCase(deleteAProduct.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
              } else {
                state.deleteResponse = action.payload;
              }
              state.loading = false
            })
            .addCase(deleteAProduct.pending, (state, action) => {
              state.loading = true;
            })
            .addCase(deleteAProduct.rejected, (state, action) => {
              state.error = "Cannot fetch data";
            })
            .addCase(productsinCategory.fulfilled, (state, action) => {
              if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
              } else {
                 state.products = action.payload;
              }
              state.loading = false
            })
            .addCase(productsinCategory.pending, (state, action) => {
              state.loading = true
            })
            .addCase(productsinCategory.rejected, (state, action) => {
              state.error = "Cannot fetch data"
            })
    }
})

const productsReducer = productsSlice.reducer
export const { cleanUpProductReducer } = productsSlice.actions
export default productsReducer