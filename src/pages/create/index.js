import { useSigner } from "wagmi";
import { ContractFactory } from "ethers";
import ChildERC721 from "../../abi/ChildERC721.json";

export default function Create() {
  const { data: signer } = useSigner();

  const deployAndAddEvent = async (title) => {
    const contract = await _deploy();
    _addEvent(title, contract.address);
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

  const _addEvent = async (title, address) => {
    const motherERC721 = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const event = {
      title,
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
      <button onClick={() => deployAndAddEvent("title")}>Deploy</button>
    </div>
  );
}
