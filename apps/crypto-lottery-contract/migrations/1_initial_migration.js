"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Migrations = artifacts.require("Migrations");
const deploy = (deployer) => {
    deployer.deploy(Migrations);
};
exports.default = deploy;
