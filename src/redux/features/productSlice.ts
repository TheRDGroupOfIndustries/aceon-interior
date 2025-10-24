import { IProduct } from "@/models/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFeatureProducts = createAsyncThunk(
  "product/fetchFeatureProducts",
  async (_, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("limit", "3");

      const response = await fetch(`/api/product?${params.toString()}`);
      if (!response.ok) {
        rejectWithValue("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      page,
      limit = 12,
      category,
      search,
      sortBy,
      sortOrder,
    }: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
      sortBy?: string;
      sortOrder?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);

      const response = await fetch(`/api/product?${params.toString()}`);
      if (!response.ok) {
        rejectWithValue("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/product/${id}`);
      if (!response.ok) {
        rejectWithValue("Failed to fetch product");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface ProductState {
  fearureProducts: IProduct[];
  products: IProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  fearureProducts: [],
  products: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  loading: true,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Feature Products
    builder
      .addCase(fetchFeatureProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatureProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fearureProducts = action.payload.data.products;
        state.loading = false;
      })
      .addCase(fetchFeatureProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products = action.payload.data.products;
        state.pagination = action.payload.data.pagination;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
export const {
  setProducts,
  setPagination,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productSlice.actions;
