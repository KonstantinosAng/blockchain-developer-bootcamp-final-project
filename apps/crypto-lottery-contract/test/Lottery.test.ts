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

	it('should allow a user to buy tickets with amount and emit an event', async () => {
		const txt = await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE })
		const tickets = await instance.getTickets()
		assert.equal(tickets.length, 11, "No tickets are bought")
		const { logs } = txt
		assert.equal(
      logs[0].event === 'TicketsBought',
      true,
      'Buying a ticket should emit an event',
    );
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
})

export {}
