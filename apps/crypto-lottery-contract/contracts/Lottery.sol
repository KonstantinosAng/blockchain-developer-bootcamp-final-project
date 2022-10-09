// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity >=0.8.0 <0.9.0;

// @title A Contract for making a Lottery
// @author K. Angelopoulos
// @notice You can use this contract to construct new Lotteries
contract Lottery {
	uint256 public constant ticketPrice = 0.01 ether; // price per ticket
	uint256 public constant maxTickets = 100; // maximum tickets per lottery
	uint256 public constant duration = 30 minutes; // The duration set for the lottery

	uint256 public expiration; // Timeout in case that the lottery was not carried out.
	address public lotteryOwner; // the creator of the lottery

	mapping(address => uint256) public winnings; // maps the winners to there winnings
	address[] public tickets; //array of purchased Tickets

	constructor() {
		lotteryOwner = msg.sender; // Address that deployed the contract
		expiration = block.timestamp + duration; // lottery expiration time
	}

	// @info Event for buying tickets
	event TicketsBought(address _buyerAddress, uint256 _ticketsBought);

	// @info modifier to check if caller is the lottery owner
	modifier isLotteryOwner() {
		require((msg.sender == lotteryOwner), "Caller is not the lottery operator");
		_;
	}

	// @info modifier to check if caller is a winner
	modifier isWinner() {
		require(IsWinner(), "Caller is not a winner");
		_;
	}

	// @info return all the tickets
	function getTickets() public view returns (address[] memory) {
		return tickets;
	}

	// @info return winnings for specific caller address
	function getWinningsForAddress(address addr) public view returns (uint256) {
		return winnings[addr];
	}

	// @info Buy tickets for the lottery
	function BuyTickets() public payable {
		// Check if buyer sends the correct amount of money
		require(
			msg.value % ticketPrice == 0,
			// use abi.encodePacked instead of string.concat to reduce the gas consumption
			// https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity
			string(
				abi.encodePacked(
					"the value must be multiple of ",
					Strings.toString(ticketPrice),
					" Ether"
				)
			)
		);

		// Get number of tickets to buy
		uint256 numOfTicketsToBuy = msg.value / ticketPrice;

		// Check if there are enough tickets to buy
		require(
			numOfTicketsToBuy <= RemainingTickets(),
			"Not enough tickets available."
		);

		// Push buyer to tickets array
		for (uint256 i = 0; i < numOfTicketsToBuy; i++) {
			tickets.push(msg.sender);
		}

		// Emit event for tickets bought
		emit TicketsBought(msg.sender, numOfTicketsToBuy);
	}

	// @info Restart the Lottery
	// @notice Only the lottery owner can execute this
	function restartLottery() public isLotteryOwner {
		// check if lottery tickets are empty
		require(
			tickets.length == 0,
			"Cannot Restart Lottery as Lottert is in play"
		);
		// delete tickets again in order to be sure
		delete tickets;
		// update lottery expiration time
		expiration = block.timestamp + duration;
	}

	// @info Check if caller is winner
	function IsWinner() public view returns (bool) {
		return winnings[msg.sender] > 0;
	}

	// @info Get current winning reward
	function CurrentWinningReward() public view returns (uint256) {
		return tickets.length * ticketPrice;
	}

	// @info Get remaining lottery tickets
	function RemainingTickets() public view returns (uint256) {
		return maxTickets - tickets.length;
	}
}
