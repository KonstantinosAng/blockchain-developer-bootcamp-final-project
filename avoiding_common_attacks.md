# Avoiding common attacks

Below follows a list with attack vectors and security measures taken into account.

### [`Integer Overflow and Underflow`](https://swcregistry.io/docs/SWC-101)

Overflow and underflow attacks are minimized by the use of the OpenZeppelin's SafeMath library. [`SWC-101`](https://swcregistry.io/docs/SWC-101)

### [`Reentrancy`](https://swcregistry.io/docs/SWC-107)

The best practices to avoid Reentrancy weaknesses are:

- Using OpenZeppelin's ReentrancyGuard. [`SWC-107`](https://swcregistry.io/docs/SWC-107)
- Make sure all internal state changes are performed before the call is executed using the Checks-Effects-Interactions pattern. [`SWC-107`](https://swcregistry.io/docs/SWC-107)

### [`Authorization through tx.origin`](https://swcregistry.io/docs/SWC-115)

All functions use msg.sender instead of tx.origin to access the caller address. [`SWC-115`](https://swcregistry.io/docs/SWC-115)

### [`Floating Pragma`](https://swcregistry.io/docs/SWC-103)

Locking the pragma version to ensure that the contract is not accidentally get deployed using an outdated compiler version. [`SWC-103`](https://swcregistry.io/docs/SWC-103)

### [`Using modifiers for validation`](https://swcregistry.io/docs/SWC-110)

Some modifiers have bee created in order to determine either the role of a winner, or the role of the caller. [`SWC-110`](https://swcregistry.io/docs/SWC-110)
