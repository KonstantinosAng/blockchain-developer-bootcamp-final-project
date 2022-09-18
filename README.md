# blockchain-developer-bootcamp-final-project

## <img src="./images/polygon.svg" alt="polygon" width="36px" /> <a href="https://constantine.dev" > ConsenSys Academy Final Project - Crypto Lottery </a>

A crypto lottery WEB3 [turborepo](https://turborepo.org/) using [NextJS](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), [ReactJS](https://reactjs.org/), [TailwindCSS](https://tailwindcss.com/), [Solidity](https://docs.soliditylang.org/en/v0.8.17/), [Truffle](https://trufflesuite.com/)  and [ThirdWeb](https://thirdweb.com/).

A Polygon (MATIC) based app where any user can log in with his MetaMask wallet and buy lottery tickets. The duration of the lottery is 30 minutes. The more tickets a user have the more chances he has to win the prize.

### Actions

#### The buyer can:

```md
> Buy tickets.

> Refund all tickets before the lottery ends.

> Withdraw winnings.
```

#### The lottery bank can:
```md
> Draw winner ticket.

> Withdraw commission.

> Restart draw.

> Calculate current winning reward.

> Find the winner.

> Calculate remaining tickets. 
```

[//]: # (below line is for horizontal line DO NOT DELETE)
#

<div align="center">

[<img alt="demo" width="100px" src="./images/demo.png" />](https://constantine.dev)

</div>


[//]: # (below line is for horizontal line DO NOT DELETE)
#

<br />

### <img src="./images/apps.png" alt="apps" width="20px" /> Apps and Packages

- `📁 crypto-lottery`: a [Next.js](https://nextjs.org) app for the ui
- `📁 crypto-lottery-contract`: a [Solidity](https://docs.soliditylang.org/en/v0.8.17/) app for the smart contract
- `📁 ui`: a stub [React](https://reactjs.org/) component library shared by the `crypto-lottery` app
- `📁 eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `📁 tsconfig`: `tsconfig.json`'s used throughout the monorepo
- `📁 tailwindcss-config`: `tailwind.config.js`'s used throughout the monorepo

### <img src="./images/utility.png" alt="utility" width="20px" /> Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.
- [NextJS](https://nextjs.org) for routing and Server Side Rendering.
- [ReactJS](https://reactjs.org/) for building the UI components.
- [TailwindCSS](https://tailwindcss.com/) for css styling.
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/) for the smart contract.
- [Truffle](https://trufflesuite.com/) for the solidity tests.
- [ThirdWeb](https://thirdweb.com/) for releasing and deploying the smart contract.

[//]: # (below line is for horizontal line DO NOT DELETE)
#

### <img src="./images/requirement.png" alt="requirement" width="20px" /> Prerequisites

Install these globally on your computer

- `yarn ^1.22.5`
- `node.js v16.17.0`

[//]: # (below line is for horizontal line DO NOT DELETE)
#

### <img src="./images/ux.png" alt="ux" width="20px" /> Frontend (apps/crypto-lottery)

#### Install Dependencies

```bash
yarn install or npm install
```

Create a .env.local file on the root of the apps/crypto-lottery app, based on the .env.example file

```bash
BROWSER=none
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

#### Build

To build all apps and packages, run the following command:

```bash
cd crypto-lottery
yarn run build
```

#### Develop

To develop all apps and packages, run the following command:

```bash
cd crypto-lottery
yarn run dev
```

[//]: # (below line is for horizontal line DO NOT DELETE)
#

### <img src="./images/agreement.png" alt="agreement" width="20px" /> Smart Contract (apps/crypto-lottery-contract)

#### Install Dependencies

```bash
cd crypto-lottery/apps/crypto-lottery-contract
yarn install or npm install
```

#### Deploy the smart contract in [Thirdweb](https://thirdweb.com/):

```bash
npx thirdweb@latest release
```

1. Open the thirdweb link and check the Mumbai(MATIC) Testnet to release the contract.

2. Use these Polygon Faucets to obtain some money for the polygon testnet gas fees:

   - [Polygon Faucets](https://faucet.polygon.technology/)
   - [Polygon Faucets](https://mumbaifaucet.com)
   - [Polygon Faucets](https://stakely.io/en/faucet/polygon-matic)

3. After releasing and getting some money, click on Deploy Now and select Mumbai(MATIC) Testnet.

4. Copy the deployed Contract's address (below the contract's name), create a .env.local file as the .env.example file and paste the value in this variable:

```bash
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

[//]: # (below line is for horizontal line DO NOT DELETE)
#

### <img src="./images/test.png" alt="agreement" width="20px" /> Solidity Tests


[//]: # (below line is for horizontal line DO NOT DELETE)
#

### <img src="./images/new-release.png" alt="new-release" width="20px" /> Releases

My [Releases](https://thirdweb.com/0xcA1B3A854f4029d8fA3e9A5EA15a2065850AC010/Lottery)

### <img src="./images/deployment.png" alt="deployment" width="20px" /> Deployments

My [Deployments](https://thirdweb.com/mumbai/0xe8aB62c322cDDAf454E636A801e2F8c7772980Ea/)

[//]: # (below line is for horizontal line DO NOT DELETE)
#

##### * Created for the as the final project of the [ConsenSys blockchain developer bootcamp](https://consensys.net/academy/bootcamp/)