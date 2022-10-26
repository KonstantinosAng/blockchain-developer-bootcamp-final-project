import { useStore } from "@lib/store"

export const useNFTFactoryStore = (stateSelector: Function) => useStore("nftFactoryStore", stateSelector)
