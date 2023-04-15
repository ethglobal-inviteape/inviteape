// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IChildERC721 {
    event Lent(address indexed from, address indexed to, uint256 indexed tokenId, uint256 duration);
    event Claimed(address indexed from, address indexed to, uint256 indexed tokenId, uint256 timestamp);
    event GivenBack(address indexed from, address indexed to, uint256 indexed tokenId, uint256 timestamp);

    function mint(uint256 tokenId) external;
    function lend(address to, uint256 tokenId, uint256 duration) external;
    function claim(uint256 tokenId) external;
    function giveBack(uint256 tokenId) external;
    function motherERC721() external view returns (address);
    function expiration(uint256 tokenId) external view returns (uint256);
}

contract ChildERC721 is ERC721, IChildERC721 {
    address private _motherERC721;
    mapping(uint256 => uint256) private _expirations; // tokenId => expiration

    constructor(
        string memory name_,
        string memory symbol_,
        address motherERC721_
    ) ERC721(name_, symbol_) {
        require(motherERC721_ != address(0), "ChildERC721: origin is the zero address");
        _motherERC721 = motherERC721_;
    }

    function transferFrom(
        address,
        address,
        uint256
    ) public virtual override {
        revert("We do not allow transfer of ownership.");
    }

    function safeTransferFrom(
        address,
        address,
        uint256
    ) public virtual override {
        revert("We do not allow transfer of ownership.");
    }

    function mint(uint256 tokenId) public virtual {
        // address originOwner = IERC721(_motherERC721).ownerOf(tokenId);
        // _safeMint(msg.sender, tokenId);
    }

    function lend(address to, uint256 tokenId, uint256 duration) public override {
        address originOwner = IERC721(_motherERC721).ownerOf(tokenId);
        require(
            msg.sender == originOwner ||
            isApprovedForAll(originOwner, _msgSender())
        );

        uint256 expiration_ = block.timestamp + duration;
        _expirations[tokenId] = expiration_;

        _transfer(originOwner, to, tokenId);
        emit Lent(originOwner, to, tokenId, duration);
    }

    function claim(uint256 tokenId) public override {
        require(_expirations[tokenId] < block.timestamp, "ChildERC721: not expired");

        address originOwner = IERC721(_motherERC721).ownerOf(tokenId);
        require(
            msg.sender == originOwner ||
            isApprovedForAll(originOwner, _msgSender())
        );

        address owner = ERC721.ownerOf(tokenId);
        _transfer(owner, originOwner, tokenId);
        emit Claimed(originOwner, owner, tokenId, block.timestamp);
    }

    function giveBack(uint256 tokenId) public override {
        address owner = _ownerOf(tokenId);
        require(
            msg.sender == owner ||
            isApprovedForAll(owner, _msgSender())
        );

        address originOwner = IERC721(_motherERC721).ownerOf(tokenId);
        _transfer(owner, originOwner, tokenId);
        emit GivenBack(owner, originOwner, tokenId, block.timestamp);
    }

    function motherERC721() public view override returns (address) {
        return address(_motherERC721);
    }

    function expiration(uint256 tokenId) public view override returns (uint256) {
        return _expirations[tokenId];
    }
}
