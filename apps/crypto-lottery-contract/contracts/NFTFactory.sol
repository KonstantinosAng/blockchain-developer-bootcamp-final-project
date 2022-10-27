//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity >=0.8.4 <0.9.0;

contract NFTFactory is ERC721URIStorage, Ownable, ReentrancyGuard {
	using SafeMath for uint256;

	// Struct to keep track of a user's winning NFTs
	struct NFT {
		address _userAddress; // NFT user address
		uint256 uid; // NFT uid for user
		uint256 tokenId; // NFT id in NFT factory
		string metaDataURL; // NFT metadata URL
	}

	// Bool to enable minting
	bool public isMintEnabled;
	// Use a counter list for every nft minted
	using Counters for Counters.Counter;
	// TokenIds list to store every nft token id minted
	Counters.Counter private _tokenIds;
	// create an event for mintNFT
	event NFTMinted(uint256);
	// create an event for toggling minting
	event MintToggle(bool);

	mapping(address => NFT[]) public nfts; // maps the winners to there winnings

	// Extend the contract with the ERC721 token constructor
	constructor() ReentrancyGuard() ERC721("Consensys Lottery Club", "CLC") {
		isMintEnabled = true; // Enable minting on contract deploy
	}

	// @info toggle nft factory mint
	function toggleIsMintEnabled() external onlyOwner {
		// Toggle mint
		isMintEnabled = !isMintEnabled;
		emit MintToggle(isMintEnabled);
	}

	// @info return winnings for specific caller address
	function getNFTSForAddress(address addr) public view returns (NFT[] memory) {
		return nfts[addr];
	}

	// @info Function to mint an NFT
	function mint(address recipient, string memory tokenURI)
		public
		returns (uint256)
	{
		require(isMintEnabled, "Minting is not enabled");
		// Create a new nft token id by incrementing the _tokenIds list
		_tokenIds.increment();
		// Get the latest nft token id from the list
		uint256 newTokenId = _tokenIds.current();
		// Mint an nft and link it to the recipient address
		_safeMint(recipient, newTokenId);
		// get nfts of winner
		uint256 newNFTUid = getNFTSForAddress(recipient).length;
		// Linkg the nft to a URI
		_setTokenURI(newTokenId, tokenURI);
		// update winners nfts with new nft id
		nfts[recipient].push(NFT(recipient, newNFTUid + 1, newTokenId, tokenURI));
		// emit event for minting an NFT
		emit NFTMinted(newTokenId);
		// return nft id
		return newTokenId;
	}
}
