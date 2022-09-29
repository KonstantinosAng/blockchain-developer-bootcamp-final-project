import { useStore } from "@lib/store"

export const useMetaMaskStore = (stateSelector: Function) => useStore("metaMaskStore", stateSelector)
