import { ethers } from "ethers"
import Web3 from "web3"

const formatValue = (value: string | number | undefined) => (value !== undefined && value !== null ? ethers.utils.formatEther(value) : null)

const parseValue = (value: string | number | undefined, quantity: number) =>
	value !== undefined && value !== null ? Web3.utils.toWei((Number(value) * quantity).toString()) : null

export default formatValue
export { parseValue }
