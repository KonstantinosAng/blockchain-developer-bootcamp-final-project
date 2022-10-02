export interface ContractStoreStateProps {
	address: string
	remainingTickets: string
	currentWinningReward: string
	ticketPrice: string
	ticketCommission: string
	expiration: string
	buyTickets: () => void
	setRemainingTickets: () => void
	setCurrentWinningReward: () => void
	setTicketPrice: () => void
	setTicketCommission: () => void
	setExpiration: () => void
	setAddress: () => void
	setBuyTickets: () => void
}

interface InitialStateProps {
	address: string | null
	remainingTickets: string | null
	currentWinningReward: string | null
	ticketPrice: string | null
	ticketCommission: string | null
	expiration: string | null
	buyTickets: () => void
}

const initialState: InitialStateProps = {
	address: null,
	remainingTickets: null,
	currentWinningReward: null,
	ticketPrice: null,
	ticketCommission: null,
	expiration: null,
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
	setAddress: (address: string) => {
		set({
			address,
		})
	},
	setBuyTickets: (buyTickets: () => void) => {
		set({
			buyTickets,
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
