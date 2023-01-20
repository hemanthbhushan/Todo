import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "./WalletProvider";
import Web3 from "web3";
import { ethers } from "ethers";
import TransferCardWalletConnect from './TransferCardWalletConnect';
import {
    setWalletConnectAccount,
    setBalanceWalletConnect,
    setErrorMessage
  } from "./redux/formSlice";

const WalletConnectCard = () => {
    const dispatch = useDispatch();
    const walletConnectAccount = useSelector((state) => state.form.walletConnectAccount);
    const userBalanceWalletConnect = useSelector((state) => state.form.userBalanceWalletConnect);
    const [connectWallet,setConnectWallet] = useState(false);
    


    const handleConnect = async () => {

        try {
            await Provider.enable().then(async (res) => {
              let address;
              address = res[0];
              console.log('address', address)
              await Provider.request({ method: 'personal_sign', params: [Web3.utils.fromUtf8("Verify your account"), address] });
              dispatch(setWalletConnectAccount(address))
              setConnectWallet(true)
              console.log(Provider,"providerrrr")
              getAccountBalance(address)
              
        
            //   setTimeout(async () => {
            // 	window.location.reload();
            //   }, 1000);
            })
        }
              catch (error) {
                console.log(error);
                return error;
              }
        
      };
      console.log('defaultAccount', walletConnectAccount)
    
      const handleDisConnect = () => {
        Provider.disconnect();
        setConnectWallet(false)
        
      };

      const getAccountBalance = (account) => {
        Provider
          .request({ method: "eth_getBalance", params: [account, "latest"] })
          .then((balance) => {
            dispatch(setBalanceWalletConnect(ethers.utils.formatEther(balance)));
          })
          .catch((error) => {
            dispatch(setErrorMessage(error.message));
          });
      };
        
  return (

    <div>
         <button lassName="btn btn-primary" onClick={handleConnect}>
          Use WalletConnect
        </button>
		<button lassName="btn btn-primary" onClick={handleDisConnect}>
          Disconnect WalletConnect
        </button>

        {connectWallet ? (
          <>
             <div>
				<h1>displaying ConnectWallet address </h1>
              <h3>Address: {walletConnectAccount}</h3>
            </div>
            <div>
              <h3>Balance:{userBalanceWalletConnect} </h3>
            </div>
            <TransferCardWalletConnect connectWallet = {connectWallet}/>
          </>
        ) : (
          <h3>WalletConnect Disconnected</h3>
        )}

    </div>
  )
}

export default WalletConnectCard