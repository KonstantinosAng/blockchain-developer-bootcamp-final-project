export interface ContractStoreStateProps {
	remainingTickets: string
	currentWinningReward: string
	ticketPrice: string
	ticketCommission: string
	expiration: string
	lotteryTickets: Array<string> | null
	winnings: number | null
	lastWinner: Array<string | number> | null
	lotteryOwner: string | null
	lotteryOwnerTotalCommission: number | null
	buyTickets: () => void
	withdrawWinnings: () => void
	drawWinningTicket: () => void
	withdrawCommission: () => void
	restartLottery: () => void
	refundAll: () => void
	setWithdrawWinnings: () => void
	setRemainingTickets: () => void
	setCurrentWinningReward: () => void
	setTicketPrice: () => void
	setTicketCommission: () => void
	setExpiration: () => void
	setBuyTickets: () => void
	setLotteryTickets: () => void
	setWinnings: () => void
	setLastWinner: () => void
	setLotteryOwner: () => void
	setLotteryOwnerTotalCommission: () => void
	setDrawWinningTicket: () => void
	setWithdrawCommission: () => void
	setRestartLottery: () => void
	setRefundAll: () => void
}

interface InitialStateProps {
	remainingTickets: string | null
	currentWinningReward: string | null
	ticketPrice: string | null
	ticketCommission: string | null
	expiration: string | null
	lotteryTickets: Array<string> | null
	winnings: number | null
	lastWinner: Array<string | number> | null
	lotteryOwner: string | null
	lotteryOwnerTotalCommission: number | null
	buyTickets: () => void
	withdrawWinnings: () => void
	drawWinningTicket: () => void
	withdrawCommission: () => void
	restartLottery: () => void
	refundAll: () => void
}

const initialState: InitialStateProps = {
	remainingTickets: null,
	currentWinningReward: null,
	ticketPrice: null,
	ticketCommission: null,
	expiration: null,
	lotteryTickets: null,
	winnings: null,
	lastWinner: null,
	lotteryOwner: null,
	lotteryOwnerTotalCommission: null,
	buyTickets: () => {},
	withdrawWinnings: () => {},
	drawWinningTicket: () => {},
	withdrawCommission: () => {},
	restartLottery: () => {},
	refundAll: () => {},
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setRemainingTickets: (remainingTickets: number) => {
		set({
			remainingTickets,
		})
	},
	setCurrentWinningReward: (currentWinningReward: string) => {
		set({
			currentWinningReward,
		})
	},
	setTicketPrice: (ticketPrice: string) => {
		set({
			ticketPrice,
		})
	},
	setTicketCommission: (ticketCommission: string) => {
		set({
			ticketCommission,
		})
	},
	setExpiration: (expiration: string) => {
		set({
			expiration,
		})
	},
	setBuyTickets: (buyTickets: () => void) => {
		set({
			buyTickets,
		})
	},
	setLotteryTickets: (lotteryTickets: Array<string>) => {
		set({
			lotteryTickets,
		})
	},
	setWinnings: (winnings: number | null) => {
		set({
			winnings,
		})
	},
	setWithdrawWinnings: (withdrawWinnings: number | null) => {
		set({
			withdrawWinnings,
		})
	},
	setLastWinner: (lastWinner: Array<string | number> | null) => {
		set({
			lastWinner,
		})
	},
	setLotteryOwner: (lotteryOwner: Array<string | number> | null) => {
		set({
			lotteryOwner,
		})
	},
	setLotteryOwnerTotalCommission: (lotteryOwnerTotalCommission: number | null) => {
		set({
			lotteryOwnerTotalCommission,
		})
	},
	setDrawWinningTicket: (drawWinningTicket: () => void) => {
		set({
			drawWinningTicket,
		})
	},
	setWithdrawCommission: (withdrawCommission: () => void) => {
		set({
			withdrawCommission,
		})
	},
	setRestartLottery: (restartLottery: () => void) => {
		set({
			restartLottery,
		})
	},
	setRefundAll: (refundAll: () => void) => {
		set({
			refundAll,
		})
	},
	// increment: () => {
	// 	set({
	// 		count: get().count + 1,
	// 	})
	// },
})

const contractStore = {
	storeName: "contractStore",
	storeState: state,
	persist: true,
}

export default contractStore
