import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const orderStatuses = ['Delivered', 'Pending', 'Canceled'];

interface OrderState {
  orders: { orderId: string; items: any[]; status: string }[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<{ orderId: string; items: any[] }>) {
      const { orderId, items } = action.payload;
      const randomStatusIndex = Math.floor(Math.random() * orderStatuses.length);
      const randomStatus = orderStatuses[randomStatusIndex];
      state.orders.push({ orderId, items, status: randomStatus });
    },
    updateOrderStatus(state, action: PayloadAction<{ orderId: string; status: string }>) {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.orderId === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
});

// Export actions and reducer
export const { createOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;

// Selector to get all orders
export const selectOrders = (state: RootState) => state.order.orders;
