require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "0xc3c982aaffe37330f4463fe866134d10cb6e2d2d04570292e25e24624eb1f445",
      ],
    },
  },
};
