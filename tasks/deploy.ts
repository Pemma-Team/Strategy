import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Strategy } from "../src/types/Strategy";
import { Strategy__factory } from "../src/types/factories/Strategy__factory";

task("deploy").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const strategyFactory: Strategy__factory = <Strategy__factory>await ethers.getContractFactory("Strategy");
  const strategy: Strategy = <Strategy>await strategyFactory.deploy();
  await strategy.deployed();
  console.log("Strategy deployed to: ", strategy.address);
});
