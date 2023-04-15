import { useSigner } from "wagmi";
import { ContractFactory } from "ethers";
import ChildERC721 from "../../abi/ChildERC721.json";
import { useState } from "react";
import Router from "next/router";

export default function Lend() {
  const [price, setPrice] = useState("0");
  const [duration, setDuration] = useState("0");

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
      <div
        className="text-white text-2xl mb-5"
        style={{
          color: "#00ff00",
        }}
      >
        Set Price
      </div>
      <div>
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-10 w-full"
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            color: "#00ff00",
          }}
        />
      </div>
      <div
        className="text-white text-2xl mb-6"
        style={{
          color: "#00ff00",
        }}
      >
        Set Duration
      </div>
      <input
        className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-10 w-full"
        type="text"
        id="duration"
        value={duration}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={{
          color: "#00ff00",
        }}
      />
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
