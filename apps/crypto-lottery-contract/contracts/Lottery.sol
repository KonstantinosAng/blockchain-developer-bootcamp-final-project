// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity >=0.8.0 <0.9.0;

// @title A Contract for making a Lottery
// @author K. Angelopoulos
// @notice You can use this contract to construct new Lotteries
contract Lottery {
	using SafeMath for uint256;

	// Struct to keep track of the last winner
	struct LastWinner {
		address _lastWinnerAddress; // last winner address
		uint256 _lastWinnerWinnings; // last winner winnings
	}

	uint256 public constant ticketPrice = 0.01 ether; // price per ticket
	uint256 public constant maxTickets = 100; // maximum tickets per lottery
	uint256 public constant ticketCommission = 0.001 ether; // commition per ticket for the lottery owner
	uint256 public constant duration = 30 minutes; // The duration set for the lottery

	uint256 public expiration; // Timeout in case that the lottery was not carried out.
	address public lotteryOwner; // the creator of the lottery
	uint256 public lotteryOwnerTotalCommission = 0; // the total commission balance
	LastWinner public lastWinner; // the last winner of the lottery

	mapping(address => uint256) public winnings; // maps the winners to there winnings
	address[] public tickets; //array of purchased Tickets

	constructor() {
		lotteryOwner = msg.sender; // Address that deployed the contract
		expiration = block.timestamp + duration; // lottery expiration time
	}

	// @event: BuyTickets - Event for buying tickets
	event TicketsBought(address _buyerAddress, uint256 _ticketsBought);
	// @event: DrawWinnerTicket - Event for drawing the winning ticket
	event WinnerTicketDrawn(address _winnerAddress, uint256 _winnersWinnings);

	// @info modifier to check if caller is the lottery owner
	modifier isLotteryOwner() {
		require((msg.sender == lotteryOwner), "Caller is not the lottery owner");
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

	// @info Draw the winning ticket at random
	// @notice Only the lottery owner can execute this
	function DrawWinnerTicket() public isLotteryOwner {
		// Check if there is at least one ticket
		require(tickets.length > 0, "No tickets were purchased");
		// Get the hash from the first block
		bytes32 blockHash = blockhash(block.number - tickets.length);
		// generate a random nonce from the first lottery block hash and the last lottery block timestamp
		uint256 randomNumber = uint256(
			keccak256(abi.encodePacked(block.timestamp, blockHash))
		);
		// calculate the mod of the randomNumber in order for the winning ticket to be in range of the bought tickets
		uint256 winningTicket = randomNumber % tickets.length;
		// get the address of the winner
		address winner = tickets[winningTicket];
		// update winnings map with {winner: winnings}
		winnings[winner] += (tickets.length * (ticketPrice - ticketCommission));
		// update last winner
		lastWinner = LastWinner(winner, winnings[winner]);
		// update lottery owner total commission
		lotteryOwnerTotalCommission += (tickets.length * ticketCommission);
		// empty tickets in order for the new lottery to start
		delete tickets;
		// update lottery expiration time
		expiration = block.timestamp + duration;
		// Emit event for winning ticket drawn
		emit WinnerTicketDrawn(winner, winnings[winner]);
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

	// @info Check the amassed ammount of winnings
	function checkWinningsAmount() public view returns (uint256) {
		// get the caller address
		address payable winner = payable(msg.sender);
		// get the caller winnings
		uint256 reward2Transfer = winnings[winner];
		// return the caller winning
		return reward2Transfer;
	}

	// @info Withdraw the callers winnings
	// @notice Only a winner can execute this
	function WithdrawWinnings() public isWinner {
		// get the caller address
		address payable winner = payable(msg.sender);
		// get the caller winnings
		uint256 reward2Transfer = winnings[winner];
		// transfer winnings to caller
		winner.transfer(reward2Transfer);
		// delete the callers winnings after transferring the winnings
		winnings[winner] = 0;
	}

	// @info Refund all tickets
	function RefundAll() public {
		// check if lottery is active
		require(block.timestamp >= expiration, "the lottery not expired yet");
		// Loop over all tickets and for each ticket buyer address transfer back the ticket amount
		for (uint256 i = 0; i < tickets.length; i++) {
			address payable to = payable(tickets[i]); // Get ticket buyer address
			tickets[i] = address(0); // replace ticket address with null address
			to.transfer(ticketPrice); // send to ticket buyer address the ticket price back to refund them
		}
		// empty lottery tickets
		delete tickets;
	}

	// @info Check if caller is winner
	// @notice Only the lottery owner can execute this
	function WithdrawCommission() public isLotteryOwner {
		// get the caller address (owner address)
		address payable lotterOwner = payable(msg.sender);
		// get the lottery owner commission
		uint256 totalCommissionToTransfer = lotteryOwnerTotalCommission;
		// transfer winnings to lottery owner address
		lotterOwner.transfer(totalCommissionToTransfer);
		// delete the operators commission after transferring the commission
		lotteryOwnerTotalCommission = 0;
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
