// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FarTradeNFT.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    FarTradeNFT public nftContract;

    uint256 public constant FEE_PERCENTAGE = 10;
    uint256 public constant FEE_DENOMINATOR = 10000;

    Counters.Counter private _listingIdCounter;
    Counters.Counter private _auctionIdCounter;

    enum ListingStatus {
        ACTIVE,
        SOLD,
        CANCELLED
    }

    enum AuctionStatus {
        ACTIVE,
        ENDED,
        CANCELLED
    }

    struct Listing {
        uint256 listingId;
        uint256 tokenId;
        address seller;
        uint256 price;
        ListingStatus status;
        uint256 timestamp;
    }

}
