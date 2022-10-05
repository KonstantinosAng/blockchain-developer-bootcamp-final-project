const Migrations = artifacts.require("Migrations")

const deploy = (deployer: any) => {
	deployer.deploy(Migrations)
}

export default deploy
