import WalletConnectProvider from "@walletconnect/web3-provider";

export const Provider = new WalletConnectProvider(
    {
      rpc: {
        80001: "https://rpc-mumbai.maticvigil.com",
      },
      chainId: 80001,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust", "coinbase", "walletconnect"],
      },
    }
  );