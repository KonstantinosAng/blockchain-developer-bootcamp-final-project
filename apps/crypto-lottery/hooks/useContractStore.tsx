import { useStore } from "@lib/store"

export const useContractStore = (stateSelector: Function) => useStore("contractStore", stateSelector)
