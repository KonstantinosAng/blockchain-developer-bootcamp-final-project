interface InitialStateProps {
	winner: boolean
	winningsAmount: number | null
}

const initialState: InitialStateProps = {
	winner: false,
	winningsAmount: null,
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setWinner: (winner: boolean) => {
		set({
			winner,
		})
	},
	setWinningsAmount: (winningsAmount: number) => {
		set({
			winningsAmount,
		})
	},
})

const uiStore = {
	storeName: "uiStore",
	storeState: state,
	persist: false,
}

export default uiStore
