import Web3 from "web3"
import { tryCatchRevertError } from "./exceptionHandler"

const NFTFactory = artifacts.require("NFTFactory")

interface NFT {
	_userAddress: string,
	uid: number,
	tokenId: number,
	metaDataURL: string
}

contract('Running NFT Factory', (accounts) => {
	const [BUYER, bob] = accounts
	let instance: any
	let isMintEnabled: boolean
	let nfts: Array<NFT>

	const NFTMetadata: string = 'https://gateway.pinata.cloud/ipfs/QmPk2PWQhmxi7xJkmq18i9XHJqfH4QH3DouTd4iNTkY1XQ'

	before(async () => {
    instance = await NFTFactory.deployed();
		isMintEnabled = await instance.isMintEnabled.call();
  });

	it('should allow the nft factory owner to toggle mint and emit an event', async () => {
		assert.equal(
      isMintEnabled,
      true,
      'mint should be enabled',
    );
		const mintContext = await instance.toggleIsMintEnabled()
		const { logs } = mintContext
		assert.equal(
      logs[0].event === 'MintToggle',
      true,
      'toggling minting should emit an event',
    );
		isMintEnabled = await instance.isMintEnabled.call();
		assert.equal(
      isMintEnabled,
      false,
      'mint should be disabled',
    );
	})

	it('should not allow a user to mint an NFT when minting is disabled', async () => {
		await tryCatchRevertError(instance.mint(BUYER, NFTMetadata));
		/* Enable minting for the next test functions */
		await instance.toggleIsMintEnabled()
		isMintEnabled = await instance.isMintEnabled.call();
		assert.equal(
      isMintEnabled,
      true,
      'mint should be disabled',
    );
	})

	it('should allow a user to mint an NFT and emit an event', async () => {
		const tokenId = await instance.mint(BUYER, NFTMetadata);
		const nft = await instance.getNFTSForAddress(BUYER);
		assert.equal(
      nft.length,
      1,
      'minting and NFT should emit an event',
    );
		const { logs } = tokenId
		assert.equal(
      logs[1].event,
      'NFTMinted',
      'minting and NFT should emit an event',
    );
	})
})

export {}
