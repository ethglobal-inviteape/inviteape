// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ChildERC721.sol";
import "./DelegationProtocolBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// todo: If the token has not been minted yet, token should be minted right before renting.

interface IDelegationProtocol is IDelegationProtocolBase {
    struct Rental {
        address lender;
        address borrower;
        address erc721;
        uint256 tokenId;
        address erc20;
        uint256 amount;
        uint256 duration;
        uint256 expiredAt;
    }

    event Fulfilled(
        bytes32 indexed id,
        Rental rental
    );
    event Settled(
        bytes32 indexed id,
        uint256 usedPeriod,
        uint256 fee
    );
    event Canceled(
        bytes32 indexed biddingHash
    );

    function fulfill(
        address lender,
        address borrower,
        address erc721,
        uint256 tokenId,
        address erc20,
        uint256 amount,
        uint256 duration,
        bytes calldata signature
    ) external;
    function settle(bytes32 id) external;
    function usagePeriod(bytes32 id) external view returns (uint256);
    function fee(bytes32 id) external view returns (uint256);
}

contract DelegationProtocol is DelegationProtocolBase, IDelegationProtocol {
    mapping(bytes32 => Rental) private _rentals;
    mapping(bytes32 => bool)   private _isBiddingCanceled;

    function fulfill(
        address lender,
        address borrower,
        address erc721,
        uint256 tokenId,
        address erc20,
        uint256 amount,
        uint256 duration,
        bytes calldata signature
    ) public {
        if (
            lender == address(0)
        ) {
            require(borrower != address(0), "DelegationProtocol: borrower is the zero address");

            require(
                msg.sender == IERC721(erc721).ownerOf(tokenId),
                "DelegationProtocol: not fulfiller"
            );

            bytes32 biddingHash_ = _deriveBiddingHash(
                Bidding(
                    lender,
                    borrower,
                    erc721,
                    tokenId,
                    erc20,
                    amount,
                    duration
                )
            );
            require(!_isBiddingCanceled[biddingHash_], "DelegationProtocol: canceled bidding");
            require(_verifySignature(signature, borrower, biddingHash_), "DelegationProtocol: invalid signature");

            Rental memory rental_ = Rental(
                msg.sender,
                borrower,
                erc721,
                tokenId,
                erc20,
                amount,
                duration,
                block.timestamp + duration
            );
            bytes32 id = keccak256(
                abi.encodePacked(
                    msg.sender,
                    borrower,
                    erc721,
                    tokenId,
                    erc20,
                    amount,
                    duration,
                    block.timestamp + duration
                )
            );

            _rentals[id] = rental_;
            emit Fulfilled(id, rental_);

            IERC20(erc20).transferFrom(borrower, address(this), amount);
            IChildERC721(erc721).lend(borrower, tokenId, duration);
        } else if (
            borrower == address(0)
        ) {
            require(lender != address(0), "DelegationProtocol: lender is the zero address");

            require(
                lender == IERC721(erc721).ownerOf(tokenId),
                "DelegationProtocol: not fulfiller"
            );

            bytes32 biddingHash_ = _deriveBiddingHash(
                Bidding(
                    lender,
                    borrower,
                    erc721,
                    tokenId,
                    erc20,
                    amount,
                    duration
                )
            );
            require(!_isBiddingCanceled[biddingHash_], "DelegationProtocol: canceled bidding");
            require(_verifySignature(signature, lender, biddingHash_), "DelegationProtocol: invalid signature");

            Rental memory rental_ = Rental(
                lender,
                msg.sender,
                erc721,
                tokenId,
                erc20,
                amount,
                duration,
                block.timestamp + duration
            );
            bytes32 id = keccak256(
                abi.encodePacked(
                    lender,
                    msg.sender,
                    erc721,
                    tokenId,
                    erc20,
                    amount,
                    duration,
                    block.timestamp + duration
                )
            );

            _rentals[id] = rental_;
            emit Fulfilled(id, rental_);

            IERC20(erc20).transferFrom(msg.sender, address(this), amount);
            IChildERC721(erc721).lend(msg.sender, tokenId, duration);
        } else {
            revert("DelegationProtocol: invalid parameters");
        }
    }

    function settle(bytes32 id) public {
        Rental memory rental_ = _rentals[id];
        require(
            msg.sender == rental_.lender || msg.sender == rental_.borrower,
            "DelegationProtocol: not a party"
        );

        uint256 usagePeriod_ = _calculateUsagePeriod(id);
        uint256 fee_ = _calculateFee(usagePeriod_, rental_.duration, rental_.amount);

        delete _rentals[id];
        emit Settled(id, usagePeriod_, fee_);

        require(IERC20(rental_.erc20).transfer(rental_.lender, fee_));
        if (fee_ != rental_.amount) {
            require(IERC20(rental_.erc20).transfer(rental_.borrower, rental_.amount - fee_));
        }

        msg.sender == rental_.lender ?
            IChildERC721(rental_.erc721).claim(rental_.tokenId) :
            IChildERC721(rental_.erc721).giveBack(rental_.tokenId);
    }

    function cancel(
        address lender,
        address borrower,
        address erc721,
        uint256 tokenId,
        address erc20,
        uint256 amount,
        uint256 duration,
        bytes calldata signature
    ) public {
        bytes32 biddingHash_ = _deriveBiddingHash(
            Bidding(
                lender,
                borrower,
                erc721,
                tokenId,
                erc20,
                amount,
                duration
            )
        );
        require(!_isBiddingCanceled[biddingHash_], "DelegationProtocol: already canceled");
        require(_verifySignature(signature, msg.sender, biddingHash_), "DelegationProtocol: invalid signature");

        _isBiddingCanceled[biddingHash_] = true;
        emit Canceled(biddingHash_);
    }

    function _calculateFee(uint256 usagePeriod_, uint256 duration, uint256 amount) private pure returns (uint256) {
        return usagePeriod_ == duration ? amount : usagePeriod_ * amount / duration;
    }

    function _calculateUsagePeriod(bytes32 id) internal view returns(uint256) {
        Rental memory rental_ = _rentals[id];

        uint256 duration = rental_.duration; // gas savings
        uint256 usagePeriod_ = block.timestamp -
                               (rental_.expiredAt - duration);

        return usagePeriod_ >= duration ? duration : usagePeriod_;
    }

    function rental(bytes32 id) public view returns (Rental memory) {
        return _rentals[id];
    }

    function usagePeriod(bytes32 id) public view returns (uint256) {
        return _calculateUsagePeriod(id);
    }

    function fee(bytes32 id) public view returns (uint256) {
        Rental memory rental_ = _rentals[id];
        uint256 usagePeriod_ = _calculateUsagePeriod(id);

        return _calculateFee(
            usagePeriod_,
            rental_.duration,
            rental_.amount
        );
    }

    function biddingHash(Bidding memory bidding_)
        public
        view
        returns (bytes32)
    {
        // prettier-ignore
        return _deriveBiddingHash(
            Bidding(
                bidding_.lender,
                bidding_.borrower,
                bidding_.erc721,
                bidding_.tokenId,
                bidding_.erc20,
                bidding_.amount,
                bidding_.duration
            )
        );
    }

    function information()
        external
        view
        returns (
            string memory version,
            bytes32 domainSeparator
        )
    {
        return _information();
    }

    function name()
        external
        pure
        returns (string memory)
    {
        return _name();
    }

    function testVerifySignature(
        bytes memory signature,
        address signer,
        Bidding calldata bidding_
    ) external view returns (bool) {
        bytes32 biddingHash_ = _deriveBiddingHash(bidding_);

        return _verifySignature(signature, signer, biddingHash_);
    }
}
