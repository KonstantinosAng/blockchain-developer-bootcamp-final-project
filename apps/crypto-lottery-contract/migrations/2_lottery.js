"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lottery = artifacts.require("Lottery");
const deploy = (deployer) => {
    deployer.deploy(Lottery);
};
exports.default = deploy;
