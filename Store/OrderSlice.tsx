import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const orderStatuses = ['Delivered', 'Pending', 'Canceled'];

interface OrderState {
  orders: { orderId: string; items: any[]; status: string; date: string; totalPrice: number }[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<{ orderId: string; items: any[]; totalPrice: number }>) {
      const { orderId, items, totalPrice } = action.payload;
      const randomStatusIndex = Math.floor(Math.random() * orderStatuses.length);
      const randomStatus = orderStatuses[randomStatusIndex];
      const date = new Date().toLocaleDateString(); 
      state.orders.push({ orderId, items, status: randomStatus, date, totalPrice });
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

export const { createOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrders = (state: RootState) => state.order.orders;
