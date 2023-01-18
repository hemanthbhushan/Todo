import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    arr: [],
  },
  reducers: {
    addForm: (state, action) => {
      const newForm = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };

      state.arr.push(newForm);
    },
    removeElement: (state, action) =>
      void (state.arr = state.arr.filter(
        (el, index) => index !== action.payload
      )),

    removeAll: (state, action) => void (state.arr = []),

    editForm: (state, action) => void (state.arr = action.payload),
  },
});

export const { addForm, removeElement, removeAll, storeKeyValue, editForm } =
  formSlice.actions;
export default formSlice.reducer;
