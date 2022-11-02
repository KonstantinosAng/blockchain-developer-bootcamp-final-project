interface InitialStateProps {
	address: string | null
	isConnected: boolean | null
	login: () => void | null
	disconnect: () => void | null
}

const initialState: InitialStateProps = {
	address: null,
	isConnected: null,
	login: () => {},
	disconnect: () => {},
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setAddress: (address: string) => {
		set({
			address,
		})
	},
	setIsConnected: (isConnected: boolean | null) => {
		set({
			isConnected,
		})
	},
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
