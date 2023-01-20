import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    arr: [],
    txArr:[],
    defaultAccount:null,
    userBalance:null,
    // connButtonText:"Connect Wallet",
    errorMessage:null,
    chainId:null,
    walletConnectAccount:null,
    userBalanceWalletConnect:null

    
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
    addTx: (state, action) => {
      const newTx={
        from: action.payload.from,
        to: action.payload.to,
        amount: action.payload.amount,
        txHash:action.payload.txHash
      };

      state.txArr.push(newTx);
    },
    removeElement: (state, action) =>
      void (state.arr = state.arr.filter(
        (el, index) => index !== action.payload
      )),

    removeAll: (state, action) => void (state.arr = []),
    removeAllTx: (state, action) => void (state.txArr = []),

    editForm: (state, action) => void (state.arr = action.payload),
    setDefaultAccount:(state,action)=>void(state.defaultAccount=action.payload),
    setUserBalance:(state,action)=>void(state.userBalance = action.payload),
    setConnButtonText:(state,action)=>void(state.connButtonText = action.payload),
    setErrorMessage:(state,action)=>void(state.errorMessage = action.payload),
    setChainId:(state,action)=>void(state.chainId= action.payload),
    setWalletConnectAccount:(state,action)=>void(state.walletConnectAccount=action.payload),
    setBalanceWalletConnect:(state,action)=>void(state.userBalanceWalletConnect=action.payload)
  },
});

export const { addForm, removeElement, removeAll, editForm,setDefaultAccount ,setUserBalance,setConnButtonText,setErrorMessage,setChainId,removeAllTx,addTx,setWalletConnectAccount,setBalanceWalletConnect} =
  formSlice.actions;
export default formSlice.reducer;
