import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productsApi from '../api/products';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  cart: {
    items: [],
    total: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const newProducts = action.payload;

      newProducts.forEach(newProduct => {
        const existingProduct = state.products.find(
          product => product.id === newProduct.id,
        );

        if (!existingProduct) {
          state.products.push(newProduct);
        }
      });
    },
    addToCart: (state, action) => {
      const {id, quantity} = action.payload;

      const productToAdd = state.products.find(product => product.id === id);

      if (productToAdd) {
        const existingCartItem = state.cart.items.find(item => item.id === id);

        if (existingCartItem) {
          existingCartItem.quantity += quantity;
        } else {
          state.cart.items.push({...productToAdd, quantity});
        }

        state.cart.total += productToAdd.price * quantity;
      }
    },
    removeFromCart: (state, action) => {
      const {id, quantity} = action.payload;
      const existingCartItemIndex = state.cart.items.findIndex(
        item => item.id === id,
      );

      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.cart.items[existingCartItemIndex];

        if (existingCartItem.quantity > quantity) {
          existingCartItem.quantity -= quantity;
        } else {
          state.cart.items.splice(existingCartItemIndex, 1);
        }

        state.cart.total -= existingCartItem.price * quantity;
      }
    },
    productFavourited: (state, action) => {
      const {id, favourite} = action.payload;

      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.favourite = favourite;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const uniqueProducts = action.payload.filter(newProduct => {
          return !state.products.some(
            existingProduct => existingProduct.id === newProduct.id,
          );
        });

        state.products = [...state.products, ...uniqueProducts];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const {addToCart, addProducts, removeFromCart, productFavourited} =
  productSlice.actions;

export default productSlice.reducer;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productsApi.getProducts();
    return response.data.products;
  },
);

export const fetchProductCategories = createAsyncThunk(
  'products/fetchProductCategories',
  async () => {
    const response = await productsApi.getCategories();
    return response.data;
  },
);

export const selectAllProducts = state => state.products.products;
export const selectSearchedProducts = state => state.products.searchList;

export const selectProductById = (state, productId) =>
  state.products.products.find(product => product.id === productId);

export const getCartQuantity = state =>
  state.products.cart.items.reduce((total, item) => total + item.quantity, 0);
