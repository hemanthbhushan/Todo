import React, { useState } from "react";
import { ethers } from "ethers";
import TransferCard from "./TransferCard";
import { useDispatch, useSelector } from "react-redux";
import WalletConnectCard from "./WalletConnectCard";
import {
  setDefaultAccount,
  setUserBalance,
  setErrorMessage,
} from "./redux/formSlice";



const WalletCard = () => {
  const dispatch = useDispatch();
  const defaultAccount = useSelector((state) => state.form.defaultAccount);
  const userBalance = useSelector((state) => state.form.userBalance);
  const errorMessage = useSelector((state) => state.form.errorMessage);
  console.log(errorMessage, "error");

  // const [errorMessage, setErrorMessage] = useState(null);
  const [active, setActive] = useState(false);

  
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          // dispatch(setConnButtonText('Wallet Connected'));
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
          setActive(true);
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message));
          console.log("cant display metamask");
        });
    } else {
      console.log("Need to install MetaMask");
      dispatch(
        setErrorMessage("Please install MetaMask browser extension to interact")
      );
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    // setDefaultAccount(newAccount);
    console.log(newAccount, "newww");
    dispatch(setDefaultAccount(newAccount));
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        dispatch(setUserBalance(ethers.utils.formatEther(balance)));
      })
      .catch((error) => {
        dispatch(setErrorMessage(error.message));
      });
  };

  const chainChangedHandler = () => {
    // dispatch(setConnButtonText('wallet connect'));
    setConnButtonText("wallet connect");
    window.location.reload();
  };
  const setActiveHandler = () => {
    setActive(false);
    setConnButtonText("Connect Wallet");
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);




  return (
    <div>
      <div>
        <h4> Connect MetaMask </h4>
        <button lassName="btn btn-primary" onClick={connectWalletHandler}>
          {connButtonText}
        </button>
       
        
        {active ? (
          <>
            <button lassName="btn btn-primary" onClick={setActiveHandler}>
              Disconnect
            </button>
            <h1>displaying metaMask Wallet address </h1>
            <div>
              <h3>Address: {defaultAccount}</h3>
            </div>
            <div>
              <h3>Balance: {userBalance}</h3>
            </div>
			<TransferCard active={active} />
          </>
        ) : (
          <h3>Wallet Disconnected</h3>
        )}
		
		<WalletConnectCard/>
      </div>
	  
      {errorMessage}
      
    </div>
  );
};

export default WalletCard;
