# Crypto Lottery

A crypto lottery WEB3 website using NextJS, TailwindCSS, Solidity, Typescript and ThirdWeb.

[//]: # (## Demo)

[//]: # (<div align="center">)
[//]: # (  <h1><a href="https://constantine.dev:8080/cryptoLottery"> DEMO </a></h1>)
[//]: # (</div>)

### Apps and Packages

- `crypto-lottery`: a [Next.js](https://nextjs.org) app for the ui
- `crypto-lottery-contract`: a solidity app for the smart contract
- `ui`: a stub React component library shared by the `crypto-lottery` app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwindcss-config`: `tailwind.config.js`s used throughout the monorepo
### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [TailwindCSS](https://tailwindcss.com/) for css styling

## Frontend (apps/crypto-lottery)

Create a .env.local file on the root of the apps/crypto-lottery app, based on the .env.example file

```bash
BROWSER=none
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

### Build

To build all apps and packages, run the following command:

```bash
cd crypto-lottery
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd crypto-lottery
yarn run dev
```

## Smart Contract (apps/crypto-lottery-contract)

1. Deploy the smart contract in [Thirdweb](https://thirdweb.com/):

```bash
cd crypto-lottery/apps/crypto-lottery-contract
yarn install or npm install
npx thirdweb@latest release
```

1. Open the thirdweb link and check the Mumbai(MATIC) Testnet to release the contract.

1. Use these Polygon Faucets to obtain some money for the polygon testnet gas fees:

   - [Polygon Faucets](https://faucet.polygon.technology/)
   - [Polygon Faucets](https://mumbaifaucet.com)
   - [Polygon Faucets](https://stakely.io/en/faucet/polygon-matic)

1. After releasing and getting some money, click on Deploy Now and select Mumbai(MATIC) Testnet.

1. Copy the deployed Contract's address (below the contract's name), create a .env.local file as the .env.example file and paste the value in this variable:

```bash
NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS=
```

### Releases

My releases -> [Releases](https://thirdweb.com/0xcA1B3A854f4029d8fA3e9A5EA15a2065850AC010/Lottery)

### Deployments

My deployments -> [Deployments](https://thirdweb.com/mumbai/0xe8aB62c322cDDAf454E636A801e2F8c7772980Ea/)