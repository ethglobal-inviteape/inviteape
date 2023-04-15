import { useSigner } from "wagmi";
import { useState } from "react";
import { ContractFactory } from "ethers";
import ChildERC721 from "../../abi/ChildERC721.json";
import Router from "next/router";

export default function Create() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const { data: signer } = useSigner();

  const deployAndAddEvent = async (event) => {
    const contract = await _deploy();
    await _addEvent(event, contract.address);

    alert("Event is successfully created!");
    Router.push("/browse");
  };

  const _deploy = async () => {
    const factory = new ContractFactory(
      ChildERC721.abi,
      ChildERC721.bytecode,
      signer
    );
    const contract = await factory.deploy(
      "ChildERC721",
      "cTKN",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    return contract;
  };

  const _addEvent = async ({ title, date, location, description }, address) => {
    const motherERC721 = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const event = {
      title,
      date,
      location,
      description,
      childERC721: address,
      motherERC721,
    };

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      await response.json();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <div className="text-gray-400 text-xl mt-16 mb-3">Create Event</div>
      <div className="text-white text-3xl mb-5">Event Detail</div>
      <div>
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-4 w-full"
          placeholder="Event Title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-4 w-full"
          placeholder="Event Date"
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-4 w-full"
          type="text"
          placeholder="Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          style={{
            height: "227px",
          }}
          className="text-gray-400 bg-black h-16 rounded-xl pl-4 mb-4 pt-4 w-full"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-green-700 w-85 h-48 rounded-2xl text-2xl text-white border-2 border-transparent hover:border-green-500 w-full"
        style={{
          height: "79px",
        }}
        onClick={() =>
          deployAndAddEvent({
            title,
            date,
            location,
            description,
          })
        }
      >
        Create Event
      </button>
    </div>
  );
}
