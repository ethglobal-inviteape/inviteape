import { useState } from "react";
import { ethers } from "ethers";
import Router from "next/router";
import { useNetwork, useSigner, useAccount } from "wagmi";

function NFT({ tokenId }) {
  return (
    <div className="p-1 py-4 rounded-xl border-2 text-center border-green-500 hover:cursor-pointer">
      <div>
        <div className="text-white text-2xl">BAYC</div>
        <div className="text-white text-2xl">#{tokenId}</div>
      </div>
    </div>
  );
}

export default function Lend() {
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const { chain, chains } = useNetwork();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  console.log(chain);

  const domain = {
    name: "inviteape",
    version: "0.1",
    chainId: chain?.id,
    verifyingContract: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  };

  const sign = async () => {
    const bidding = {
      lender: address,
      borrower: ethers.constants.AddressZero,
      erc721: "0x30f0f60E510a64F8E28d30731Fe70B8c168fe760",
      tokenId: 123,
      erc20: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      amount: 100,
      duration,
    };
    await signer._signTypedData(domain, types, bidding);

    Router.push("/lend/completed");
  };

  const types = {
    Bidding: [
      { name: "lender", type: "address" },
      { name: "borrower", type: "address" },
      { name: "erc721", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "erc20", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "duration", type: "uint256" },
    ],
  };

  return (
    <div>
      <div className="text-gray-400 text-xl mt-16 mb-3">Lend Your NFT</div>
      <div
        className="text-white text-2xl mb-5"
        style={{
          color: "#00ff00",
        }}
      >
        Select an NFT
      </div>
      <div className="flex-row grid grid-cols-3 gap-2">
        <NFT tokenId={123} />
        {/* <NFT tokenId={456} /> */}
        {/* <NFT tokenId={789} /> */}
      </div>
      <div
        className="text-white text-2xl mb-5 mt-10"
        style={{
          color: "#00ff00",
        }}
      >
        Set Price
      </div>
      <div
        className="flex justify-center"
        style={{
          position: "relative",
        }}
      >
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-10 w-full"
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Price"
          style={{
            color: "#00ff00",
          }}
        />
        <span
          className="text-slate-500 mt-5 mr-5"
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          APE
        </span>
      </div>
      <div
        className="text-white text-2xl mb-6"
        style={{
          color: "#00ff00",
        }}
      >
        Set Duration
      </div>
      <div
        className="flex justify-center"
        style={{
          position: "relative",
        }}
      >
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-10 w-full"
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          placeholder="Duration"
          style={{
            color: "#00ff00",
          }}
        />
        <span
          className="text-slate-500 mt-5 mr-5"
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          DAYS
        </span>
      </div>
      <button
        className="bg-green-700 w-85 h-48 rounded-2xl text-2xl text-white border-2 border-transparent hover:border-green-500 w-full"
        style={{
          height: "79px",
        }}
        onClick={() => sign()}
      >
        List NFT
      </button>
    </div>
  );
}
