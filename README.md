# blockchain-developer-bootcamp-final-project

<p align="center">
  <a href="https://constantine.dev">
    <picture>
      <img src="./images/polygon.svg" width="48px" alt="polygon">
    </picture>
    <h1 style="font-weight: bold" align="center">ConsenSys Academy Final Project - Crypto Lottery</h1>
  </a>
</p>

A crypto lottery WEB3 [`turborepo`](https://turborepo.org/) using [`NextJS`](https://nextjs.org), [`TypeScript`](https://www.typescriptlang.org/), [`ReactJS`](https://reactjs.org/), [`TailwindCSS`](https://tailwindcss.com/), [`Solidity`](https://docs.soliditylang.org/en/v0.8.17/), [`Truffle`](https://trufflesuite.com/)  and [`ThirdWeb`](https://thirdweb.com/).

A Polygon (MATIC) based app where any user can log in with his MetaMask wallet and buy lottery tickets. The duration of the lottery is 30 minutes. The more tickets a user have the more chances he has to win the prize.

## Actions

<br />

### ***`Buyer actions`***

```md
> Buy tickets.

> Refund all tickets before the lottery ends.

> Withdraw winnings.
```

<br />

### ***`Lottery bank actions`***

```md
> Draw winner ticket.

> Withdraw commission.

> Restart draw.

> Calculate current winning reward.

> Find the winner.

> Calculate remaining tickets.
```

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

<div align="center">

[<img alt="demo" width="100px" src="./images/demo.png" />](https://constantine.dev)

</div>


<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

<br />

## <img src="./images/apps.png" alt="apps" width="20px" /> Apps and Packages

- `📁 crypto-lottery`: a [`Next.js`](https://nextjs.org) app for the ui
- `📁 crypto-lottery-contract`: a [`Solidity`](https://docs.soliditylang.org/en/v0.8.17/) app for the smart contract
- `📁 ui`: a stub [`React`](https://reactjs.org/) component library shared by the `crypto-lottery` app
- `📁 eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) used throughout the monorepo
- `📁 tsconfig`: `tsconfig.json`'s used throughout the monorepo
- `📁 tailwindcss-config`: `tailwind.config.js`'s used throughout the monorepo

## <img src="./images/utility.png" alt="utility" width="20px" /> Utilities

This turborepo has some additional tools already setup for you:

- [`TypeScript`](https://www.typescriptlang.org/) for static type checking.
- [`ESLint`](https://eslint.org/) for code linting.
- [`Prettier`](https://prettier.io) for code formatting.
- [`NextJS`](https://nextjs.org) for routing and Server Side Rendering.
- [`ReactJS`](https://reactjs.org/) for building the UI components.
- [`TailwindCSS`](https://tailwindcss.com/) for css styling.
- [`Solidity`](https://docs.soliditylang.org/en/v0.8.17/) for the smart contract.
- [`Truffle`](https://trufflesuite.com/) for the solidity tests.
- [`ThirdWeb`](https://thirdweb.com/) for releasing and deploying the smart contract.
- [`Docker`](https://www.docker.com/) for containerizing and running the app.

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

## <img src="./images/requirement.png" alt="requirement" width="20px" /> Prerequisites

Install these globally on your computer

- [`yarn ^1.22.5`](https://yarnpkg.com/)
- [`node.js v16.17.0`](https://nodejs.org/en/)

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

## <img src="./images/ux.png" alt="ux" width="20px" /> [`Frontend`](apps/crypto-lottery)

### Install Dependencies

```bash
yarn install or npm install
```

Create a .env.local file on the root of the apps/crypto-lottery app, based on the .env.example file

```bash
BROWSER=none
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

### Build

To build all apps and packages, run the following command:

```bash
yarn run build
```

### Run app

To run all apps and packages (after building them), run the following command:

```bash
yarn run start
```

### Develop

To develop all apps and packages, run the following command:

```bash
yarn run dev
```

or using [`Docker`](https://www.docker.com/)

```bash
yarn docker:build:dev
```

and then

```bash
docker run --env-file ./apps/crypto-lottery/.env.local -it --rm -v ${PWD}/packages/ui:/app/packages/ui -v ${PWD}/apps/crypto-lottery:/app/apps/crypto-lottery -v /app/node_modules -v /app/.next -p 3000:3000 -e CHOKIDAR_USEPOLLING=true --name crypto-lottery-app crypto-lottery
```

## <img src="./images/docker.png" alt="ux" width="20px" /> Docker

To build a production ready docker image, run the following command:

```bash
yarn docker:build
```

To run a production ready docker image after building it, run the following command:

```bash
yarn docker:run
```

Then open your browser at [`http://localhost:1237`](http://localhost:1237).

To build and run a production ready docker image in the background, run the following command:

```bash
yarn docker:compose:up
```

To stop a production ready docker image from the background, run the following command:

```bash
yarn docker:compose:down
```

To open a bash terminal inside the running docker image, run the following command:

```bash
yarn docker:bash
```

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

## <img src="./images/agreement.png" alt="agreement" width="20px" /> [`Smart Contract`](apps/crypto-lottery-contract)

### Install Dependencies

```bash
cd apps/crypto-lottery-contract
yarn install or npm install
```

### Run locally with [`Ganache`](https://trufflesuite.com/ganache/)

First start up ganache, by downloading it and running it on your computer or by installing the ganache-cli and running the following command

```bash
yarn ganache:start
```

After starting ganache, you will have a local blockchain running on your pc.

Run this command to deploy the contract migrations on the local blockchain (_**All migrations are written in `Typescript` and must end in .ts**_)

```bash
cd apps/crypto-lottery-contract
yarn truffle:migrate
```

Connect your metamask to the local network, by clicking on add network

```bash
Network Name = Localhost
New RPC URL = http://127.0.0.1:8545
Chain ID = 1337
Currency Symbol = ETH
```

Add a ganache account to access some funds

```bash
Copy a private key from a ganache account and click on MetaMask import account
```


### Deploy the smart contract in [`Thirdweb`](https://thirdweb.com/):

```bash
cd apps/crypto-lottery-contract
npx thirdweb@latest release
```

1. Open the thirdweb link and check the Mumbai(MATIC) Testnet to release the contract.

2. Use these Polygon Faucets to obtain some money for the polygon testnet gas fees:

    - [`Polygon Faucets`](https://faucet.polygon.technology/)
    - [`Polygon Faucets`](https://mumbaifaucet.com)
    - [`Polygon Faucets`](https://stakely.io/en/faucet/polygon-matic)

3. After releasing and getting some money, click on Deploy Now and select Mumbai(MATIC) Testnet.

4. Copy the deployed Contract's address (below the contract's name), create a .env.local file as the .env.example file and paste the value in this variable:

```bash
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
#

## <img src="./images/test.png" alt="agreement" width="20px" /> Solidity Tests

The tests are located in `apps/crypto-lottery-contract/test`

_**All tests are written in `Typescript` and must end in .test.ts**_

To run the tests execute the following command

```bash
yarn truffle:test
```

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
<!-- # -->

<!-- ### <img src="./images/new-release.png" alt="new-release" width="20px" /> Releases -->

<!-- My [Releases](https://thirdweb.com/0xcA1B3A854f4029d8fA3e9A5EA15a2065850AC010/Lottery) -->

<!-- ### <img src="./images/deployment.png" alt="deployment" width="20px" /> Deployments -->

<!-- My [Deployments](https://thirdweb.com/mumbai/0xe8aB62c322cDDAf454E636A801e2F8c7772980Ea/) -->

<!-- [//]: # (below line is for horizontal line DO NOT DELETE) -->
<!-- # -->

##### * Created as the final project of the [`ConsenSys blockchain developer bootcamp`](https://consensys.net/academy/bootcamp/)
