import { useStore } from "@lib/store"

export const useUiStore = (stateSelector: Function) => useStore("uiStore", stateSelector)
