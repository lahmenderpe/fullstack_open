import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  showTime: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.content;
      state.time = action.payload.time * 1000;
    },
    hideNotification(state, action) {
      state.message = action.payload;
      state.showTime = 0;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const handleShowNotification = (content, time) => {
  return (dispatch) => {
    dispatch(showNotification({ content, time }));
    setTimeout(() => {
      dispatch(hideNotification(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
