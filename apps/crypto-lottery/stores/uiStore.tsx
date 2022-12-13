interface InitialStateProps {
	winner: boolean
	winnings: number | null
}

const initialState: InitialStateProps = {
	winner: false,
	winnings: null,
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setWinner: (winner: boolean) => {
		set({
			winner,
		})
	},
	setWinnings: (winnings: number) => {
		set({
			winnings,
		})
	},
})

const uiStore = {
	storeName: "uiStore",
	storeState: state,
	persist: false,
}

export default uiStore
