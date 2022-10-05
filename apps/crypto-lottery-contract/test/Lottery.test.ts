import Web3 from "web3"
import { tryCatch } from "./exceptionHandler"

const Lottery = artifacts.require("Lottery")

contract('Lottery', (accounts) => {
	const [BUYER] = accounts
	let instance: any
	const TICKET_PRICE = Web3.utils.toWei('0.01')

	beforeEach(async () => {
    instance = await Lottery.deployed();
  });

	it('should allow a user to buy tickets with amount', async () => {
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE })
		const tickets = await instance.getTickets()
		assert.equal(tickets.length, 1, "No tickets are bought")
	})

	it('should not allow a user to buy tickets with wrong amount', async () => {
		await tryCatch(instance.BuyTickets({ from: BUYER, value: Web3.utils.toWei('0.015')}))
	})
})

export {}
