"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NFTFactory = artifacts.require("NFTFactory");
const deploy = (deployer) => {
    deployer.deploy(NFTFactory);
};
exports.default = deploy;
