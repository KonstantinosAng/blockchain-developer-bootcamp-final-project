import { ethers } from "ethers"

const formatValue = (value: string | number | undefined) => (value ? ethers.utils.formatEther(value) : null)

export default formatValue
