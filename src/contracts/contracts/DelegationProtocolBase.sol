// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IDelegationProtocolBase {
    struct Bidding {
        address lender;
        address borrower;
        address erc721;
        uint256 tokenId;
        address erc20;
        uint256 amount;
        uint256 duration;
    }
}

contract DelegationProtocolBase is IDelegationProtocolBase {
    string internal constant _NAME = "DelegationProtocol";
    string internal constant _VERSION = "0.1";

    bytes32 internal immutable _NAME_HASH;
    bytes32 internal immutable _VERSION_HASH;
    bytes32 internal immutable _EIP_712_DOMAIN_TYPEHASH;
    bytes32 internal immutable _BIDDING_ITEM_TYPEHASH;

    uint256 internal immutable _CHAIN_ID;
    bytes32 internal immutable _DOMAIN_SEPARATOR;

    constructor() {
        (
            _NAME_HASH,
            _VERSION_HASH,
            _EIP_712_DOMAIN_TYPEHASH,
            _BIDDING_ITEM_TYPEHASH
        ) = _deriveTypehashes();

        _CHAIN_ID = block.chainid;
        _DOMAIN_SEPARATOR = _deriveDomainSeparator();
    }

    function _deriveTypehashes()
        internal
        pure
        returns (
            bytes32 nameHash,
            bytes32 versionHash,
            bytes32 eip712DomainTypehash,
            bytes32 biddingItemTypehash
        )
    {
        nameHash = keccak256(bytes(_NAME));
        versionHash = keccak256(bytes(_VERSION));
        eip712DomainTypehash = keccak256(
            abi.encodePacked(
                "EIP712Domain(",
                    "string name,",
                    "string version,",
                    "uint256 chainId,",
                    "address verifyingContract",
                ")"
            )
        );

        // prettier-ignore
        bytes memory biddingItemTypeString = abi.encodePacked(
            "Bidding(",
                "address lender,",
                "address borrower,",
                "address erc721,",
                "uint256 tokenId,",
                "address erc20,",
                "uint256 amount,",
                "uint256 duration"
            ")"
        );
        biddingItemTypehash = keccak256(biddingItemTypeString);
    }

    function _deriveDomainSeparator() internal view returns (bytes32) {
        // prettier-ignore
        return keccak256(
            abi.encode(
                _EIP_712_DOMAIN_TYPEHASH,
                _NAME_HASH,
                _VERSION_HASH,
                block.chainid,
                address(this)
            )
        );
    }

    function _deriveBiddingHash(Bidding memory bidding) internal view returns (bytes32) {
        return keccak256(
            abi.encode(
                _BIDDING_ITEM_TYPEHASH,
                bidding.lender,
                bidding.borrower,
                bidding.erc721,
                bidding.tokenId,
                bidding.erc20,
                bidding.amount,
                bidding.duration
            )
        );
    }

    function _verifySignature(bytes memory signautre, address signer, bytes32 biddingHash) internal view returns (bool) {
        bytes32 digest = _hashTypedData(biddingHash);
        address recoveredSigner = ECDSA.recover(digest, signautre);

        return recoveredSigner == signer;
    }

    function _hashTypedData(bytes32 structHash) internal view returns (bytes32) {
        return ECDSA.toTypedDataHash(_domainSeparator(), structHash);
    }

    function _domainSeparator() internal view returns (bytes32) {
        // prettier-ignore
        return block.chainid == _CHAIN_ID
            ? _DOMAIN_SEPARATOR
            : _deriveDomainSeparator();
    }

    function _information()
        internal
        view
        returns (
            string memory version,
            bytes32 domainSeparator
        )
    {
        version = _VERSION;
        domainSeparator = _domainSeparator();
    }

    function _name() internal pure returns (string memory) {
        return _NAME;
    }
}