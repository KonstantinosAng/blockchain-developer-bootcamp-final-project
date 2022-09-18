# ConsenSys Academy Final Project

## <img src="./packages/ui/assets/polygon.svg" alt="polygon" width="30px" /> <a href="https://constantine.dev" > Crypto Lottery </a>

A crypto lottery WEB3 [turborepo](https://turborepo.org/) using [NextJS]((https://nextjs.org)), [TailwindCSS](https://tailwindcss.com/), [Solidity](https://docs.soliditylang.org/en/v0.8.17/), [TypeScript](https://www.typescriptlang.org/) and [ThirdWeb](https://thirdweb.com/).

[//]: # (## Demo)

[//]: # (<div align="center">)
[//]: # (  <h1><a href="https://constantine.dev:8080/cryptoLottery"> DEMO </a></h1>)
[//]: # (</div>)

### Apps and Packages

- `📁 crypto-lottery`: a [Next.js](https://nextjs.org) app for the ui
- `📁 crypto-lottery-contract`: a [Solidity](https://docs.soliditylang.org/en/v0.8.17/) app for the smart contract
- `📁 ui`: a stub [React](https://reactjs.org/) component library shared by the `crypto-lottery` app
- `📁 eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `📁 tsconfig`: `tsconfig.json`'s used throughout the monorepo
- `📁 tailwindcss-config`: `tailwind.config.js`'s used throughout the monorepo
### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [TailwindCSS](https://tailwindcss.com/) for css styling

<hr/>

### Prerequisites

- `yarn ^1.22.5`
- `node.js v16.17.0`

<hr/>

### Frontend (apps/crypto-lottery)

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

<hr/>

### Smart Contract (apps/crypto-lottery-contract)

1. Install Dependencies

```bash
cd crypto-lottery/apps/crypto-lottery-contract
yarn install or npm install
```

2. Deploy the smart contract in [Thirdweb](https://thirdweb.com/):

```bash
npx thirdweb@latest release
```

3. Open the thirdweb link and check the Mumbai(MATIC) Testnet to release the contract.

4. Use these Polygon Faucets to obtain some money for the polygon testnet gas fees:

   - [Polygon Faucets](https://faucet.polygon.technology/)
   - [Polygon Faucets](https://mumbaifaucet.com)
   - [Polygon Faucets](https://stakely.io/en/faucet/polygon-matic)

5. After releasing and getting some money, click on Deploy Now and select Mumbai(MATIC) Testnet.

6. Copy the deployed Contract's address (below the contract's name), create a .env.local file as the .env.example file and paste the value in this variable:

```bash
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

<hr />

### Releases

My [Releases](https://thirdweb.com/0xcA1B3A854f4029d8fA3e9A5EA15a2065850AC010/Lottery)

### Deployments

My [Deployments](https://thirdweb.com/mumbai/0xe8aB62c322cDDAf454E636A801e2F8c7772980Ea/)

<hr />

##### * Created for the as the final project of the [ConsenSys blockchain developer bootcamp](https://consensys.net/academy/bootcamp/)