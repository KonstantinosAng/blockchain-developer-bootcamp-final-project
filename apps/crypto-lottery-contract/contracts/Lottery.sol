// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity >=0.8.4 <0.9.0;

/// @title A Contract for making a Lottery
/// @author K. Angelopoulos
/// @notice You can use this contract to construct new Lotteries
contract Lottery is ReentrancyGuard, AccessControl {
	using SafeMath for uint256; /// @notice Library to protect against overflows

	/// @dev Struct to keep track of the last winner
	struct LastWinner {
		address _lastWinnerAddress; /// @dev last winner address
		uint256 _lastWinnerWinnings; /// @dev last winner winnings
	}

	uint256 public constant ticketPrice = 0.01 ether; /// @dev price per ticket
	uint256 public constant maxTickets = 100; /// @dev maximum tickets per lottery
	uint256 public constant ticketCommission = 0.001 ether; /// @dev commition per ticket for the lottery owner
	uint256 public constant duration = 30 minutes; /// @dev The duration set for the lottery

	uint256 public expiration; /// @dev Timeout in case that the lottery was not carried out.
	address public lotteryOwner; /// @dev the creator of the lottery
	uint256 public lotteryOwnerTotalCommission = 0; /// @dev the total commission balance
	LastWinner public lastWinner; /// @dev the last winner of the lottery

	mapping(address => uint256) public winnings; /// @dev maps the winners to there winnings
	address[] public tickets; /// @dev array of purchased Tickets

	/// @dev Add Reentrancy Guard to protect against calling itself
	constructor() ReentrancyGuard() {
		lotteryOwner = msg.sender; /// @dev Address that deployed the contract
		expiration = block.timestamp + duration; /// @dev lottery expiration time
	}

	/// @custom:event BuyTickets - Event for buying tickets
	/// @param _buyerAddress Address that bought the tickets.
	/// @param _ticketsBought Number of tickets bought.
	/// @dev BuyTickets - Event for buying tickets
	event TicketsBought(address _buyerAddress, uint256 _ticketsBought);

	/// @custom:event DrawWinnerTicket - Event for drawing the winning ticket
	/// @param _winnerAddress Address that won the lottery.
	/// @param _winnersWinnings Amount won.
	/// @dev DrawWinnerTicket - Event for drawing the winning ticket
	event WinnerTicketDrawn(address _winnerAddress, uint256 _winnersWinnings);

	/// @custom:event LotteryRestart - Event for restarting the lottery
	/// @param _newLotteryExpiration New lottery expiration time.
	/// @dev LotteryRestart - Event for restarting the lottery
	event LotteryRestart(uint256 _newLotteryExpiration);

	/// @custom:event RefundAllTickets - Event for refunding all lottery tickets
	/// @param _refundAllTickets Boolean to emit that lottery tickets were refunded.
	/// @dev LotteryRestart - Event for restarting the lottery
	event RefundAllTickets(bool _refundAllTickets);

	/// @dev modifier to check if caller is the lottery owner
	modifier isLotteryOwner() {
		require((msg.sender == lotteryOwner), "Caller is not the lottery owner");
		_;
	}

	/// @dev modifier to check if caller is a winner
	modifier isWinner() {
		require(IsWinner(), "Caller is not a winner");
		_;
	}

	/// @notice return all the tickets
	/// @dev return all the tickets
	/// @return tickets the bought tickets
	function getTickets() public view returns (address[] memory) {
		return tickets;
	}

	/// @notice return winnings for specific caller address
	/// @dev return winnings for specific caller address
	/// @param addr Address to check their winnings.
	/// @return uint256 Winnings of giver address
	function getWinningsForAddress(address addr) public view returns (uint256) {
		return winnings[addr];
	}

	/// @notice Buy tickets for the lottery
	/// @dev Buy tickets for the lottery
	function BuyTickets() public payable {
		/// @dev Check if buyer sends the correct amount of money
		require(
			msg.value % ticketPrice == 0,
			/// @dev use abi.encodePacked instead of string.concat to reduce the gas consumption
			/// @dev https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity
			string(
				abi.encodePacked(
					"the value must be multiple of ",
					Strings.toString(ticketPrice),
					" Ether"
				)
			)
		);

		/// @dev Get number of tickets to buy
		uint256 numOfTicketsToBuy = msg.value / ticketPrice;

		/// @dev Check if there are enough tickets to buy
		require(
			numOfTicketsToBuy <= RemainingTickets(),
			"Not enough tickets available."
		);

		/// @dev Push buyer to tickets array
		for (uint256 i = 0; i < numOfTicketsToBuy; i++) {
			tickets.push(msg.sender);
		}

		/// @dev Emit event for tickets bought
		emit TicketsBought(msg.sender, numOfTicketsToBuy);
	}

	/// @notice Only the lottery owner can execute this
	/// @dev Draw the winning ticket at random
	/// @dev Only the lottery owner can execute this
	/// @return address Return the winner struct
	function DrawWinnerTicket() public isLotteryOwner returns (address) {
		/// @dev Check if there is at least one ticket
		require(tickets.length > 0, "No tickets were purchased");
		/// @dev Get the hash from the first block
		bytes32 blockHash = blockhash(block.number - tickets.length);
		/// @dev generate a random nonce from the first lottery block hash and the last lottery block timestamp
		uint256 randomNumber = uint256(
			keccak256(abi.encodePacked(block.timestamp, blockHash))
		);
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

	/// @notice Only the lottery owner can execute this
	/// @dev Restart the Lottery
	/// @dev Only the lottery owner can execute this
	function restartLottery() public isLotteryOwner {
		/// @dev check if lottery tickets are empty
		require(
			tickets.length == 0,
			"Cannot Restart Lottery as Lottery is in play"
		);
		/// @dev delete tickets again in order to be sure
		delete tickets;
		/// @dev update lottery expiration time
		expiration = block.timestamp + duration;
		/// @dev Emit event for lottery restarting
		emit LotteryRestart(expiration);
	}

	/// @notice Check the amassed ammount of winnings
	/// @dev Check the amassed ammount of winnings
	/// @return uint256 Return the winning amount
	function checkWinningsAmount() public view returns (uint256) {
		/// @dev get the caller address
		address payable winner = payable(msg.sender);
		/// @dev get the caller winnings
		uint256 reward2Transfer = winnings[winner];
		/// @dev return the caller winning
		return reward2Transfer;
	}

	/// @notice Only a winner can execute this
	/// @dev Withdraw the callers winnings
	/// @dev Only a winner can call this function
	function WithdrawWinnings() public isWinner nonReentrant {
		/// @dev get the caller address
		address payable winner = payable(msg.sender);
		/// @dev get the caller winnings
		uint256 reward2Transfer = winnings[winner];
		/// @dev transfer winnings to caller
		winner.transfer(reward2Transfer);
		/// @dev delete the callers winnings after transferring the winnings
		winnings[winner] = 0;
	}

	/// @notice Refund all tickets
	/// @dev Refund all tickets
	/// @dev Only the lottery owner can execute this
	function RefundAll() public isLotteryOwner {
		/// @dev check if lottery is active
		require(block.timestamp >= expiration, "the lottery has not expired yet");
		/// @dev Loop over all tickets and for each ticket buyer address transfer back the ticket amount
		for (uint256 i = 0; i < tickets.length; i++) {
			address payable to = payable(tickets[i]); /// @dev Get ticket buyer address
			tickets[i] = address(0); /// @dev replace ticket address with null address
			to.transfer(ticketPrice); /// @dev send to ticket buyer address the ticket price back to refund them
		}
		/// @dev empty lottery tickets
		delete tickets;
		/// @dev emit event for refunding all tickets
		emit RefundAllTickets(true);
	}

	/// @notice Only the lottery owner can execute this
	/// @dev Check if caller is winner
	/// @dev Only the lottery owner can execute this
	function WithdrawCommission() public isLotteryOwner {
		/// @dev get the caller address (owner address)
		address payable lotterOwner = payable(msg.sender);
		///  @dev get the lottery owner commission
		uint256 totalCommissionToTransfer = lotteryOwnerTotalCommission;
		/// @dev transfer winnings to lottery owner address
		lotterOwner.transfer(totalCommissionToTransfer);
		/// @dev delete the operators commission after transferring the commission
		lotteryOwnerTotalCommission = 0;
	}

	/// @notice Check if caller is winner
	/// @dev Check if caller is winner
	/// @return bool return if address is winner
	function IsWinner() public view returns (bool) {
		return winnings[msg.sender] > 0;
	}

	/// @notice Get current winning reward
	/// @dev Get current winning reward
	/// @return uint256 returns current winning reward
	function CurrentWinningReward() public view returns (uint256) {
		return tickets.length * ticketPrice;
	}

	/// @notice Get remaining lottery tickets
	/// @dev Get remaining lottery tickets
	/// @return uint256 returns remainig available tickets
	function RemainingTickets() public view returns (uint256) {
		return maxTickets - tickets.length;
	}
}
