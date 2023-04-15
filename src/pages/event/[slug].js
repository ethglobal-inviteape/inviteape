import { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ChildERC721 from "../../abi/ChildERC721.json";
import { ethers } from "ethers";
import Modal from "react-modal";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Event() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tokenId, setTokenId] = useState("0");

  const { config } = usePrepareContractWrite({
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: ChildERC721.abi,
    functionName: "mint",
    args: [ethers.BigNumber.from(tokenId)],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function afterOpenModal() {}

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          write();
        }}
      >
        attend this event!
      </button>
      <button onClick={openModal}>
        Not this time! (but I want to give a change to someone)
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
