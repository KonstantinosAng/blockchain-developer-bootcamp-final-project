import { ethers } from "ethers"

const formatValue = (value: string | number | undefined) => (value !== undefined && value !== null ? ethers.utils.formatEther(value) : null)

const parseValue = (value: string | number | undefined, quantity: number) =>
	value !== undefined && value !== null ? ethers.utils.parseEther((Number(ethers.utils.formatEther(value)) * quantity).toString()) : null

export default formatValue
export { parseValue }
