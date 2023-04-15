import { useState, useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import ChildERC721 from "../../abi/ChildERC721.json";
import { ethers } from "ethers";
import Router from "next/router";

export default function Event() {
  const [tokenId, setTokenId] = useState("2");

  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: ChildERC721.abi,
    functionName: "mint",
    args: [ethers.BigNumber.from(tokenId)],
  });
  const { write } = useContractWrite(config);

  const { data: balance } = useContractRead({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: ChildERC721.abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div>
      <div className="text-gray-400 text-xl mt-16 mb-3">Event Detail</div>
      <div className="text-white text-3xl mb-5">Event Title!</div>
      <div
        style={{
          color: "#00ff00",
        }}
      >
        1234
      </div>
      <div className="text-white pb-5">@ 1234</div>
      <div className="rounded-xl bg-black mb-6">
        <div className="text-slate-400 pt-3 pl-3 pb-3">Description</div>
        <div className="text-slate-400 pl-3 pb-3">test</div>
      </div>
      <button
        className="bg-green-700 w-85 h-48 rounded-2xl text-2xl text-white border-2 border-transparent hover:border-green-500 w-full mb-4"
        style={{
          height: "79px",
        }}
        onClick={() => {
          write();
        }}
      >
        Join the Event
      </button>
      <button
        className="bg-orange-600 w-85 h-48 rounded-2xl text-2xl text-white border-2 border-transparent hover:border-yellow-500 w-full"
        style={{
          height: "79px",
        }}
        onClick={() => Router.push("/lend")}
      >
        Lend Your NFT
      </button>
    </div>
  );
}
