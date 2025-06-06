// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title FarTrade NFT Contract
/// @notice ERC721 contract with royalty support for the FarTrade marketplace
/// @dev Implements ERC721, ERC2981 royalties, and marketplace integration
contract FarTradeNFT is ERC721, ERC721URIStorage, ERC721Royalty, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    // State variables
    Counters.Counter private _tokenIdCounter;

    // Marketplace contract address
    address public marketplaceContract;

    // Mapping from token ID to creator
    mapping(uint256 => address) public tokenCreators;

    // Events
    event NFTMinted(uint256 indexed tokenId, address indexed creator, address indexed to, string tokenURI);
    event MarketplaceUpdated(address indexed oldMarketplace, address indexed newMarketplace);
    event RoyaltySet(uint256 indexed tokenId, address indexed recipient, uint96 feeNumerator);

    // Custom errors
    error InsufficientBalance();
    error InvalidRoyaltyPercentage();
    error UnauthorizedMinter();
    error TokenNotExists();

    constructor() ERC721("FarTrade NFT", "FRTD") {}

    /// @notice Mint a new NFT with metadata and royalty
    /// @param to Address to mint the NFT to
    /// @param tokenURI Metadata URI for the NFT
    /// @param royaltyPercentage Royalty percentage (in basis points, e.g., 250 = 2.5%)
    /// @return tokenId The ID of the newly minted token
    function mintNFT(
        address to,
        string memory tokenURI,
        uint96 royaltyPercentage
    ) external nonReentrant returns (uint256) {
        if (royaltyPercentage > 2000) revert InvalidRoyaltyPercentage(); // Max 20%

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Set creator
        tokenCreators[tokenId] = msg.sender;

        // Set royalty for the creator
        if (royaltyPercentage > 0) {
            _setTokenRoyalty(tokenId, msg.sender, royaltyPercentage);
        }

        emit NFTMinted(tokenId, msg.sender, to, tokenURI);
        emit RoyaltySet(tokenId, msg.sender, royaltyPercentage);

        return tokenId;
    }

    /// @notice Get the creator of a token
    /// @param tokenId The token ID to query
    /// @return The address of the token creator
    function getTokenCreator(uint256 tokenId) external view returns (address) {
        if (!_exists(tokenId)) revert TokenNotExists();
        return tokenCreators[tokenId];
    }

    /// @notice Get total supply of minted tokens
    /// @return The total number of tokens minted
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /// @notice Set the marketplace contract address
    /// @param _marketplaceContract Address of the marketplace contract
    function setMarketplaceContract(address _marketplaceContract) external onlyOwner {
        address oldMarketplace = marketplaceContract;
        marketplaceContract = _marketplaceContract;
        emit MarketplaceUpdated(oldMarketplace, _marketplaceContract);
    }

    /// @notice Check if marketplace is approved for all tokens of an owner
    /// @param owner The owner address
    /// @return True if marketplace is approved
    function isMarketplaceApproved(address owner) external view returns (bool) {
        return isApprovedForAll(owner, marketplaceContract);
    }

    // Required overrides for multiple inheritance
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
