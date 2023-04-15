import baycImg from './bayc-circle.png';

const EventDetail = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col pt-10">
      <div className="flex flex-col items-center pb-12 md:border-b-0 md:pb-0">
        <section className="p-1 mb-2">
          <div className="text-[#F8F8F] text-[17px] opacity-50">Event Detail</div>
          <div className="text-[#F8F8F] text-[34px] leading-[44px]">Official BAYC Meet-up in NFT NYC!</div>
          <div className="text-glowgreen">Thu, Apr 20, 08:00pm</div>
          <div>@ Intrepid Sea, Air & Space Museum</div>
        </section>
        <section className="mb-3">
          <div className="flex flex-col py-2 px-4 text-base text-2xl text-[#FFFFFF] bg-[#0E0E0E] rounded-lg opacity-75">
            <div className="mb-1">Description</div>
            <div>Yuga Labs is inviting BAYC holders and friends
              to join our official meet-up in NYC this year!</div>
            <div className="text-glowgreen">read more</div>
          </div>
        </section>
        <section className="mb-3">
          <div className="mx-auto flex flex-col py-2 px-4 text-base text-2xl text-[#FFFFFF] bg-[#0E0E0E] rounded-lg">
            <div className="flex flex-col item-center">
              <div className="mb-3 flex flex-row item-center justify-center text-glowgreen text-[24px] text-center">You’ve successfully rented
                BAYC #0000-X!</div>
              <div className="mb-6 flex flex-row item-center justify-center">
                <img
                className="h-[148px] w-[148px] rounded-lg md:h-[280px] md:w-[280px]"
                src={baycImg.src}/>
              </div>
              <div
                class="mb-6 flex w-[250px] h-[68px] flex-row items-center justify-center rounded-lg bg-green-600 py-2 text-base text-white mx-auto text-[24px]">Share on Lens
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  )
}

export default EventDetail;
