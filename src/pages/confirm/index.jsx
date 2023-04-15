const Confirm = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col pt-10">
      <div className="flex flex-col items-center px-4 pb-12 md:border-b-0 md:pb-0">
        <div class="mb-6 flex w-[250px] flex-row items-center justify-center py-2 text-base text-glowgreen text-2xl">Confirm Payment</div>
        <div class="flex flex-row items-center justify-center gap-2"><img
          className="h-[290px] w-[290px] rounded-lg md:h-[280px] md:w-[280px]"
          src="https://i.imgur.com/m7pVBqs.jpg" />
        {/* 이미지 수정*/}
        </div>
        <div class="mb-2 flex w-[250px] flex-row items-center justify-center py-2 text-base text-glowgreen text-xl">BAYC #0000-X</div>
        <div class="mb-3 flex w-[250px] flex-row items-center justify-center py-2 text-base text-xl">Duration: 00 Days</div>
        <div class="mb-6 flex w-[250px] flex-row items-center justify-center py-2 text-base text-glowgreen text-3xl">Price: 00ETH</div>
        <div class="mb-6 flex w-[250px] flex-row items-center justify-center rounded-lg bg-green-600 py-2 text-base text-white">Confirm</div>
        <div class="mb-6 flex w-[250px] flex-row items-center justify-center rounded-lg bg-green-600 py-2 text-base text-white">Cancel</div>
      </div>
    </div>
  )
}

export default Confirm;
