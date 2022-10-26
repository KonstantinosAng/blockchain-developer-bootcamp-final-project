export interface NFTFactoryStoreStateProps {
	mint: () => void
	setMint: () => void
	toggleIsMintEnabled: () => void
	setToggleIsMintEnabled: () => void
	getNFTSForAddress: () => void
	setGetNFTSForAddress: () => void
}

interface InitialStateProps {
	mint: () => void
	toggleIsMintEnabled: () => void
	getNFTSForAddress: () => void
}

const initialState: InitialStateProps = {
	mint: () => {},
	toggleIsMintEnabled: () => {},
	getNFTSForAddress: () => {},
}

const state = (preloadedState: object) => (set: Function, get: Function) => ({
	...initialState,
	...preloadedState,
	setMint: (mint: () => void) => {
		set({
			mint,
		})
	},
	setToggleIsMintEnabled: (toggleIsMintEnabled: () => void) => {
		set({
			toggleIsMintEnabled,
		})
	},
	setGetNFTSForAddress: (getNFTSForAddress: () => void) => {
		set({
			getNFTSForAddress,
		})
	},
})

const nftFactoryStore = {
	storeName: "nftFactoryStore",
	storeState: state,
	persist: true,
}

export default nftFactoryStore
