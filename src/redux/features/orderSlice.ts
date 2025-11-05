import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "@/models/Order";

// Define the order state interface
interface OrderState {
  orders: IOrder[];
  currentOrder: IOrder | null;
  total: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  total: 0,
  loading: false,
  error: null,
};

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    orderData: {
      productId: string;
      quantity: number;
      variant: string;
      address: {
        fullName: string;
        street: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
      };
      paymentMethod: string;
      grandTotal: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create order");
      }

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create order");
    }
  }
);

// Async thunk for fetching user orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (
    {
      page = 1,
      limit = 10,
      status = "all",
    }: { page?: number; limit?: number; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/order?page=${page}&limit=${limit}&status=${status}`
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch orders");
      }
      console.log("fetchUserOrders", data);
      return { orders: data.data, total: data.total || 0 };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch orders");
    }
  }
);

export const fetchAllOrdersByAdmin = createAsyncThunk(
  "order/fetchAllOrdersByAdmin",
  async (
    {
      page = 1,
      limit = 10,
      status = "all",
    }: { page?: number; limit?: number; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/order/admin?page=${page}&limit=${limit}&status=${status}`
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch orders");
      }
      console.log("fetchUserOrders", data);
      return { orders: data.data, total: data.total || 0 };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch orders");
    }
  }
);

// Async thunk for fetching a specific order
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/order/${orderId}`);

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch order");
      }

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch order");
    }
  }
);

// Async thunk for updating order status (admin)
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: IOrder["status"] },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "update_status", status }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return rejectWithValue(data.message || "Failed to update order status");
      }

      return data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to update order status");
    }
  }
);

// Async thunk for cancelling an order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (
    { orderId, reason }: { orderId: string; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cancel", reason }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to cancel order");
      }

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to cancel order");
    }
  }
);

// Async thunk for deleting an order (admin only)
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete order");
      }

      return orderId; // Return the deleted order ID
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete order");
    }
  }
);

// Create the order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.loading = false;
          state.orders.unshift(action.payload); // Add to beginning of orders array
          state.currentOrder = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch User Orders
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<{ orders: IOrder[]; total: number }>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch User Orders
    builder
      .addCase(fetchAllOrdersByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOrdersByAdmin.fulfilled,
        (state, action: PayloadAction<{ orders: IOrder[]; total: number }>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
        }
      )
      .addCase(fetchAllOrdersByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Order by ID
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Order Status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.loading = false;
          // Update the order in the orders array
          const index = state.orders.findIndex(
            (order) => order._id === action.payload._id
          );
          if (index !== -1) {
            state.orders[index].status = action.payload.status;
          }
          // Update current order if it's the same
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload as string;
      });

    // Cancel Order
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        cancelOrder.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.loading = false;
          console.log(action.payload);
          // Update the order in the orders array
          const index = state.orders.findIndex(
            (order) => order._id === action.payload._id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          // Update current order if it's the same
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
        }
      )
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          // Remove the deleted order from the orders array
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload
          );
          // Decrement total count
          state.total = Math.max(0, state.total - 1);
          // Clear current order if it's the deleted one
          if (state.currentOrder?._id === action.payload) {
            state.currentOrder = null;
          }
        }
      )
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
