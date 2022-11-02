interface ContractStoreStateProps {
	remainingTickets: string
	currentWinningReward: string
	ticketPrice: string
	ticketCommission: string
	expiration: string
	lotteryTickets: Array<string> | null
	winnings: number | null
	lastWinner: Array<string | number> | null
	lotteryOwner: string | null
	lotteryOwnerTotalCommission: number | null
	buyTickets: () => void
	withdrawWinnings: () => void
	drawWinningTicket: () => void
	withdrawCommission: () => void
	restartLottery: () => void
	refundAll: () => void
	setWithdrawWinnings: () => void
	setRemainingTickets: () => void
	setCurrentWinningReward: () => void
	setTicketPrice: () => void
	setTicketCommission: () => void
	setExpiration: () => void
	setBuyTickets: () => void
	setLotteryTickets: () => void
	setWinnings: () => void
	setLastWinner: () => void
	setLotteryOwner: () => void
	setLotteryOwnerTotalCommission: () => void
	setDrawWinningTicket: () => void
	setWithdrawCommission: () => void
	setRestartLottery: () => void
	setRefundAll: () => void
}

interface MetamaskStoreStateProps {
	address: string
	setAddress: () => void
	isConnected: boolean | null
	login: () => void | null
	disconnect: () => void | null
	setLogin: () => void
	setDisconnect: () => void
	setIsConnected: () => void
}

interface NFTFactoryStoreStateProps {
	mint: () => void
	setMint: () => void
	toggleIsMintEnabled: () => void
	userNFTs: Array<NFT>
	setUserNFTS: () => void
	setToggleIsMintEnabled: () => void
	getNFTSForAddress: () => void
	setGetNFTSForAddress: () => void
}

interface NFT {
	_userAddress: string
	uid: number
	tokenId: number
	metaDataURL: string
}
