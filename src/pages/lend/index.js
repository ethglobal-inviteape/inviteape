import { useSigner } from "wagmi";
import { ContractFactory } from "ethers";
import ChildERC721 from "../../abi/ChildERC721.json";
import { useState } from "react";
import Router from "next/router";

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
        onClick={() => alert()}
      >
        List NFT
      </button>
    </div>
  );
}
