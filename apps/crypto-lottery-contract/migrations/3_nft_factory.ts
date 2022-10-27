const NFTFactory = artifacts.require("NFTFactory");

const deploy = (deployer: any) => {
	deployer.deploy(NFTFactory);
};

export default deploy;
