import { useSigner } from "wagmi";
import { ContractFactory } from "ethers";
import ChildERC721 from "../../abi/ChildERC721.json";

export default function Create() {
  const { data: signer } = useSigner();

  const deploy = async () => {
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
    console.log(contract);
  };

  const addEvent = async () => {
    const event = {
      title: "1234",
    };
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();
      console.log("Item added:", data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <button onClick={() => addEvent()}>Deploy</button>
    </div>
  );
}
