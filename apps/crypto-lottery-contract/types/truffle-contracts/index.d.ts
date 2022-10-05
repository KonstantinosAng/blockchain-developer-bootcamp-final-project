/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { AccessControlContract } from "./AccessControl";
import { ERC165Contract } from "./ERC165";
import { IAccessControlContract } from "./IAccessControl";
import { IERC165Contract } from "./IERC165";
import { LotteryContract } from "./Lottery";
import { MigrationsContract } from "./Migrations";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "AccessControl"): AccessControlContract;
      require(name: "ERC165"): ERC165Contract;
      require(name: "IAccessControl"): IAccessControlContract;
      require(name: "IERC165"): IERC165Contract;
      require(name: "Lottery"): LotteryContract;
      require(name: "Migrations"): MigrationsContract;
    }
  }
}

export { AccessControlContract, AccessControlInstance } from "./AccessControl";
export { ERC165Contract, ERC165Instance } from "./ERC165";
export {
  IAccessControlContract,
  IAccessControlInstance,
} from "./IAccessControl";
export { IERC165Contract, IERC165Instance } from "./IERC165";
export { LotteryContract, LotteryInstance } from "./Lottery";
export { MigrationsContract, MigrationsInstance } from "./Migrations";