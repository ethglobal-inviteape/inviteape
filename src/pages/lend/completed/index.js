export default function LendCompleted() {
  const dummyData = {
    title: "Official BAYC Meet-up in NFT NYC !",
    motherERC721: "1234",
    childERC721: "1234",
    location: "Intrepid Sea, Air & Space Museum",
    date: "Thu, Apr 20, 08:00pm",
    description:
      "Yuga Labs is excited to invite all Bored Ape Yacht Club members and friends to our official meet-up in New York City this year! This is a fantastic opportunity for you to meet our team in person, network with fellow members of the Bored Ape Yacht Club community, and enjoy a fun-filled evening of drinks, games, and surprises.",
    attendees: [1, 2, 3],
    invitesAvailable: [1, 2],
  };

  return (
    <div>
      <div className="text-gray-400 text-xl mt-16 mb-3">Event Detail</div>
      <div className="text-white text-3xl mb-5">{dummyData.title}</div>
      <div
        style={{
          color: "#00ff00",
        }}
      >
        {dummyData.date}
      </div>
      <div className="text-white pb-5">@ {dummyData.location}</div>
      <div className="rounded-xl bg-black mb-6">
        <div className="text-slate-400 pt-3 pl-3 pb-3">Description</div>
        <div className="text-slate-400 pl-3 pb-3">{dummyData.description}</div>
      </div>
      <div className="border-2 rounded-xl border-green-500 text-center py-10">
        <div
          className="text-2xl mb-5"
          style={{
            color: "#00ff00",
          }}
        >
          Your NFT is Listed!
        </div>
        <div>BAYC #123</div>
        <div>Duration: 20 Days</div>
        <div
          style={{
            color: "#00ff00",
          }}
        >
          Price: 100 APE
        </div>
      </div>
    </div>
  );
}
