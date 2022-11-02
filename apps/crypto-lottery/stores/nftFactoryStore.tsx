interface InitialStateProps {
	mint: () => void
	toggleIsMintEnabled: () => void
	getNFTSForAddress: () => void
	userNFTs: Array<NFT>
}

const initialState: InitialStateProps = {
	mint: () => {},
	toggleIsMintEnabled: () => {},
	getNFTSForAddress: () => {},
	userNFTs: [],
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
	setUserNFTS: (userNFTs: Array<NFT>) => {
		set({
			userNFTs,
		})
	},
})

const nftFactoryStore = {
	storeName: "nftFactoryStore",
	storeState: state,
	persist: true,
}

export default nftFactoryStore
