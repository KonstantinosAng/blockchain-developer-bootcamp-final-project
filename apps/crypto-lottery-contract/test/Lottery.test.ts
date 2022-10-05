import Web3 from "web3"
import { tryCatchRevertError } from "./exceptionHandler"

const Lottery = artifacts.require("Lottery")

contract('Running Lottery', (accounts) => {
	const [BUYER] = accounts
	let instance: any
	let TICKET_PRICE: any
	let MAX_TICKET_VALUES: any

	before(async () => {
    instance = await Lottery.deployed();
		TICKET_PRICE = await instance.ticketPrice.call()
		MAX_TICKET_VALUES = await instance.maxTickets.call() * TICKET_PRICE + TICKET_PRICE
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
  });

	// const TICKET_COMMISSION = Web3.utils.toWei('0.001')

	it('should allow a user to buy tickets with amount', async () => {
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE })
		const tickets = await instance.getTickets()
		assert.equal(tickets.length, 11, "No tickets are bought")
	})

	it('should not allow a user to buy tickets with wrong amount', async () => {
		await tryCatchRevertError(instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 1.5}))
	})

	it('should not allow a user to buy more tickets than the max amount', async () => {
		await tryCatchRevertError(instance.BuyTickets({ from: BUYER, value: MAX_TICKET_VALUES}))
	})

	it('should allow a user to get the current winning reward', async () => {
		const amount = await instance.CurrentWinningReward()
		assert.equal(amount.toString(), Web3.utils.toWei('0.11'), 'No current winnings')
	})

	it('should allow a user to get the remaining tickets', async () => {
		const ticketsRemaining = await instance.RemainingTickets()
		assert.equal(ticketsRemaining.toString(), 89, 'No remaining tickets')
	})

	it('should allow a user to check if he is the winner', async () => {
		const winner = await instance.IsWinner()
		assert.equal(winner, false, "User is the winner")
	})

	it('should allow a user to check his winnings', async () => {
		const winnings = await instance.getWinningsForAddress(BUYER)
		assert.equal(winnings.toString(), 0, "User winnings")
	})

	it('should not allow the operator to restart the draw if there are still tickets', async () => {
		await tryCatchRevertError(instance.restartDraw())
	})

	it('should not allow a user to withdraw winnings if he is not the winner', async () => {
		await tryCatchRevertError(instance.WithdrawWinnings())
	})

	it('should allow a user to withdraw winnings if he is the winner', async () => {
		await instance.DrawWinnerTicket()
		await instance.WithdrawWinnings()
	})
})

contract('Empty Lottery', (accounts) => {
	it('should not allow the operator to draw a winning ticket if there are no tickets purchased', async () => {
		const instance = await Lottery.deployed();
		await tryCatchRevertError(instance.DrawWinnerTicket())
	})
})

// contract('Expired Lottery', (accounts) => {
// 	const [BUYER] = accounts
// 	let instance: any
// 	let TICKET_PRICE: any
// 	before(async () => {
//     instance = await Lottery.deployed();
// 		TICKET_PRICE = await instance.ticketPrice.call()
// 		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
//   });
// 	it('should not allow a user to buy tickets if the lottery is closed', async () => {
// 		await tryCatchRevertError(instance.DrawWinnerTicket())
// 		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
// 	})
// })

export {}
