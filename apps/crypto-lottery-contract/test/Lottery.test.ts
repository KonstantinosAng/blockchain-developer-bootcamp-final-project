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

	it('should allow a user to check if he is the winner', async () => {
		const winner = await instance.IsWinner()
		assert.equal(winner, false, "User is the winner")
	})

	it('should allow a user to check his winnings', async () => {
		const winnings = await instance.getWinningsForAddress(BUYER)
		assert.equal(winnings.toString(), 0, "User winnings")
	})

	it('should not allow the lottery owner to restart the draw if there are still tickets', async () => {
		await tryCatchRevertError(instance.restartLottery())
	})

	it('should not allow a user to withdraw winnings if he is not the winner', async () => {
		await tryCatchRevertError(instance.WithdrawWinnings())
	})

	it('should allow a user to withdraw winnings if he is the winner and emit an event', async () => {
		const txt = await instance.DrawWinnerTicket()
		const { logs } = txt
		assert.equal(
      logs[0].event === 'WinnerTicketDrawn',
      true,
      'Drawing a winning ticket should emit an event',
    );
		await instance.WithdrawWinnings()
	})

	it('should not allow to refund all tickets if the lottery has not expired yet', async () => {
		await tryCatchRevertError(instance.RefundAll())
	})

	it('should not allow owner to restart the lottery there are more tickets to buy', async () => {
		await tryCatchRevertError(instance.restartLottery())
	})
})

contract('Empty Lottery', () => {
	it('should not allow the lottery owner to draw a winning ticket if there are no tickets purchased', async () => {
		const instance = await Lottery.deployed();
		await tryCatchRevertError(instance.DrawWinnerTicket())
	})
})

contract('Restart Lottery', (accounts) => {
	const [BUYER] = accounts
	let instance: any
	let TICKET_PRICE: any
	before(async () => {
    instance = await Lottery.deployed();
		TICKET_PRICE = await instance.ticketPrice.call()
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
		await instance.DrawWinnerTicket()
  });
	it('should allow owner to restart the lottery if there are no more tickets to buy and emit an event', async () => {
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
		const context2 = await instance.DrawWinnerTicket()
		assert.equal(
      context2.logs[0].event === 'WinnerTicketDrawn',
      true,
      'Drawing a winning ticket should emit an event',
    );
		const context3 = await instance.restartLottery()
		const { logs } = context3
		assert.equal(
      logs[0].event === 'LotteryRestart',
      true,
      'Restarting the lottery should emit an event',
    );
	})
})

contract('Refund all Tickets', (accounts) => {
	const [BUYER] = accounts
	let instance: any
	let TICKET_PRICE: any
	before(async () => {
    instance = await Lottery.deployed();
		TICKET_PRICE = await instance.ticketPrice.call()
		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
		await instance.DrawWinnerTicket()
  });
	it('should not allow to refund all lottery tickets if the lottery has not expired yet', async () => {
		await tryCatchRevertError(instance.RefundAll())
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
// 		await instance.DrawWinnerTicket()
//   });
// 	it('should not allow a user to buy tickets if the lottery is closed', async () => {
// 		await instance.BuyTickets({ from: BUYER, value: TICKET_PRICE * 10 })
// 	})
// })

export {}
