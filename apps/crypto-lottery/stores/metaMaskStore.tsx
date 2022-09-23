export interface MetamaskStoreStateProps {
	login: () => void | null
	disconnect: () => void | null
	setLogin: () => void
	setDisconnect: () => void
}

interface InitialStateProps {
	login: () => void | null
	disconnect: () => void | null
}

const initialState: InitialStateProps = {
	login: () => {},
	disconnect: () => {},
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setLogin: (login: Function) => {
		set({
			login,
		})
	},
	setDisconnect: (disconnect: Function) => {
		set({
			disconnect,
		})
	},
})

const metaMaskStore = {
	storeName: "metaMaskStore",
	storeState: state,
	persist: true,
}

export default metaMaskStore
