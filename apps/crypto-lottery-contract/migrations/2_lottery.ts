const Lottery = artifacts.require("Lottery")

const deploy = (deployer: any) => {
	deployer.deploy(Lottery)
}

export default deploy
