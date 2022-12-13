// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity >=0.8.4 <0.9.0;

/// @title A Contract for minting an NFT
/// @author K. Angelopoulos
/// @notice You can use this contract to mint NFTs
contract NFTFactory is ERC721URIStorage, Ownable, ReentrancyGuard {
	using SafeMath for uint256; /// @notice Library to protect against overflows

	/// @dev Struct to keep track of a user's winning NFTs
	struct NFT {
		address _userAddress; /// @dev NFT user address
		uint256 uid; /// @dev NFT uid for user
		uint256 tokenId; /// @dev NFT id in NFT factory
		string metaDataURL; /// @dev NFT metadata URL
	}

	/// @dev Bool to enable minting
	bool public isMintEnabled;
	/// @dev Use a counter list for every nft minted
	using Counters for Counters.Counter;
	/// @dev TokenIds list to store every nft token id minted
	Counters.Counter private _tokenIds;
	/// @custom:event create an event for mintNFT
	event NFTMinted(uint256);
	/// @custom:event create an event for toggling minting
	event MintToggle(bool);

	mapping(address => NFT[]) public nfts; /// @dev maps the winners to there winnings

	/// @dev Extend the contract with the ERC721 token constructor
	/// @dev Add Reentrancy Guard to protect against calling itself
	constructor() ReentrancyGuard() ERC721("Consensys Lottery Club", "CLC") {
		isMintEnabled = true; ///Enable minting on contract deploy
	}

	/// @notice toggle nft factory mint
	/// @dev toggle nft factory mint
	function toggleIsMintEnabled() external onlyOwner {
		/// @dev Toggle mint
		isMintEnabled = !isMintEnabled;
		emit MintToggle(isMintEnabled);
	}

	/// @notice get nfts of specific address
	/// @param addr addres to get the nfts
	/// @return NFT return mapping of NFT's struct
	function getNFTSForAddress(address addr) public view returns (NFT[] memory) {
		return nfts[addr];
	}

	/// @notice Function to mint an NFT
	/// @param recipient Address that the NFT will go to
	/// @param tokenURI The NFT token uri
	/// @return uint256 The new NFT token id
	function mint(address recipient, string memory tokenURI)
		public
		returns (uint256)
	{
		require(isMintEnabled, "Minting is not enabled");
		/// @dev Create a new nft token id by incrementing the _tokenIds list
		_tokenIds.increment();
		///@dev Get the latest nft token id from the list
		uint256 newTokenId = _tokenIds.current();
		/// @dev Mint an nft and link it to the recipient address
		_mint(recipient, newTokenId);
		///@dev get nfts of winner
		uint256 newNFTUid = getNFTSForAddress(recipient).length;
		/// @dev Linkg the nft to a URI
		_setTokenURI(newTokenId, tokenURI);
		/// @dev update winners nfts with new nft id
		nfts[recipient].push(NFT(recipient, newNFTUid + 1, newTokenId, tokenURI));
		/// @dev emit event for minting an NFT
		emit NFTMinted(newTokenId);
		/// @dev return nft id
		return newTokenId;
	}
}
