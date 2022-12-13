# Design pattern decisions

Below follows a list with the designed patterns taken into account.

### Optimizing Gas

- For example when concatenating string the following code is used to reduce gas consumption:

  ```js
  string(abi.encodePacked("the value must be multiple of ", Strings.toString(ticketPrice), " Ether"))
  ```

  The abi.encodePacked uses less gas compared to string.concat as seen [`here.`](https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity)

- Another example can be found in the NFTFactory contract where the \_mint() function is used over the \_safeMint(). \_safeMint() checks every address to ensure that it can handle NFTs. If the address is not able to handle NFTs, it ensures that the transaction will fail. This is unnecessary as every address minting can likely handle NFTs. This extra check add more gas.

- Another example in the NFTFactory contract is the usage of the ERC721 over the ERC721Enumerable. The ERC721Enumerable extension is used to track the owners of an NFT on-chain. Mints that remove the ERC721Enumerable extension save around 70% in gas costs. The ERC721Enumerable extension is mostly unnecessary. In the majority of cases, tracking ownership on-chain is not useful as you can just grab the data off-chain on the front-end and pass it into smart contracts instead! Every front-end is able to handle this easily.

### Access Control Design Patterns

Some functions in the contract have restricted access depending on the caller. The OpenZeppelin's AccessControl along with the corresponding modifiers were used to achieve this.

For example:

```js

/// @dev modifier to check if caller is the lottery owner
modifier isLotteryOwner() {
  require((msg.sender == lotteryOwner), "Caller is not the lottery owner");
  _;
}

/// @notice Only the lottery owner can execute this
function DrawWinnerTicket() public isLotteryOwner returns (address) {
  /// @dev Check if there is at least one ticket
  require(tickets.length > 0, "No tickets were purchased");
  /// @dev Get the hash from the first block
  bytes32 blockHash = blockhash(block.number - tickets.length);
  /// @dev generate a random nonce from the first lottery block hash and the last lottery block timestamp
  uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, blockHash)));
  /// @dev calculate the mod of the randomNumber in order for the winning ticket to be in range of the bought tickets
  uint256 winningTicket = randomNumber % tickets.length;
  /// @dev get the address of the winner
  address winner = tickets[winningTicket];
  /// @dev update winnings map with {winner: winnings}
  winnings[winner] += (tickets.length * (ticketPrice - ticketCommission));
  /// @dev update last winner
  lastWinner = LastWinner(winner, winnings[winner]);
  /// @dev update lottery owner total commission
  lotteryOwnerTotalCommission += (tickets.length * ticketCommission);
  /// @dev empty tickets in order for the new lottery to start
  delete tickets;
  /// @dev update lottery expiration time
  expiration = block.timestamp + duration;
  /// @dev Emit event for winning ticket drawn
  emit WinnerTicketDrawn(winner, winnings[winner]);
  /// @dev Return winning address
  return winner;
}
```

### Inheritance and Interfaces

The Lottery Contract inherits functionality from the following contracts:

- SafeMath.sol
- Strings.sol
- AccessControl.sol
- ReentrancyGuard.sol

The NFTFactory Contract inherits functionality from the following contracts:

- SafeMath.sol
- ERC721.sol
- Counters.sol
- Ownable.sol
- ReentrancyGuard.sol

For example:

```js
/// @dev Extend the contract with the ERC721 token constructor
/// @dev Add Reentrancy Guard to protect against calling itself
constructor() ReentrancyGuard() ERC721("Consensys Lottery Club", "CLC") {
  isMintEnabled = true; ///Enable minting on contract deploy
}
```

```js
contract Lottery is ReentrancyGuard, AccessControl {
	using SafeMath for uint256; /// @notice Library to protect against overflows

	...
}
```
