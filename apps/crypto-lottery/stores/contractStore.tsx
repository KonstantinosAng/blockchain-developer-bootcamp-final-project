export interface ContractStoreStateProps {
	remainingTickets: string
	currentWinningReward: string
	ticketPrice: string
	ticketCommission: string
	expiration: string
	lotteryTickets: Array<string> | null
	winnings: Number | null
	buyTickets: () => void
	setRemainingTickets: () => void
	setCurrentWinningReward: () => void
	setTicketPrice: () => void
	setTicketCommission: () => void
	setExpiration: () => void
	setBuyTickets: () => void
	setLotteryTickets: () => void
	setWinnings: () => void
}

interface InitialStateProps {
	remainingTickets: string | null
	currentWinningReward: string | null
	ticketPrice: string | null
	ticketCommission: string | null
	expiration: string | null
	lotteryTickets: Array<string> | null
	winnings: number | null
	buyTickets: () => void
}

const initialState: InitialStateProps = {
	remainingTickets: null,
	currentWinningReward: null,
	ticketPrice: null,
	ticketCommission: null,
	expiration: null,
	lotteryTickets: null,
	winnings: null,
	buyTickets: () => {},
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
