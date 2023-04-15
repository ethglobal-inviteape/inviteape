import baycImg from "./bayc-circle.png";

const Confirm = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col pt-10">
      <div className="flex flex-col items-center pb-12 md:border-b-0 md:pb-0">
        <div className="mb-6 flex w-[250px] flex-row items-center justify-center py-2 text-glowgreen text-[24px]">
          Confirm Payment
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <img
            className="h-[148px] w-[148px] rounded-lg md:h-[280px] md:w-[280px]"
            alt="bayc-child-nft"
            src={baycImg.src}
          />
        </div>
        <div className="flex w-[250px] flex-row items-center justify-center py-2 text-[18px]">
          BAYC #8116
        </div>
        <div className="mb-3 flex w-[250px] flex-row items-center justify-center py-2 text-[18px]">
          Duration: 20 Days
        </div>
        <div className="mb-6 flex w-[250px] flex-row items-center justify-center py-2 text-glowgreen text-[30px]">
          Price: 1000 APE
        </div>
        <div
          className="mb-6 flex w-[250px] h-[68px] flex-row items-center justify-center rounded-lg bg-green-600 py-2 text-white text-[24px] border-[#09FF3F] border-2 hover:cursor-pointer"
          onClick={() => {
            alert("1");
          }}
        >
          Confirm
        </div>
        <div className="mb-6 flex w-[250px] h-[68px] flex-row items-center justify-center rounded-lg bg-[#417C4E] py-2 text-black text-[24px]">
          Cancel
        </div>
      </div>
    </div>
  );
};

export default Confirm;
