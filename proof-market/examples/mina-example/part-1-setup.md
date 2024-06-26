# Part 1. Setup

Mina proofs are computationally heavy; hence, proof producers can benefit from using Proof Market to generate Mina state proofs for their further in-EVM validation.

You're going to need the following environments ready for this guide.

## Step 1: Proof Market

Prerequisites from Proof Market side are:

- [Proof Market toolchain installation and setup](../../toolchain/installation).
  You don't need to set up a virtual environment for Proof Market toolchain,
  we will only be using its Python scripts.
  This directory will be referred to as `proof-market-toolchain` home in the guide.
- [Authentication on Proof Market](../../toolchain/sign-up).
  There's no need to register as a producer, any account will suffice.

## Step 2: Mina state proof

Mina state proof repository maintained by `=nil;` Foundation comprises the following artifacts:

- Solidity EVM verifier;
- C++ circuits;
- scripts to fetch Mina state (ledger) and Mina account state (user's or app's).

Clone the [Mina state proof repository](https://github.com/NilFoundation/mina-state-proof) and run `npm i` from the project's directory to install all its dependencies.

This directory will be referred to as `mina-state-proof` home in the guide.

## Step 3: Mina zk app

Mina zk app project consists of a sample zk app located at `mina-state-proof/examples/mina-add-zkapp` with 8 state variables that are updated on each interaction.

This directory will be referred to as `mina-add-zkapp` home in the guide.

Follow the steps from [mina-add-zkapp's README](https://github.com/NilFoundation/mina-state-proof/tree/master/examples/mina-add-zkapp) to install the project dependencies.

After that, you should have the following three directories ready:

```bash
proof-market-toolchain/
mina-state-proof/
mina-state-proof/examples/mina-add-zkapp/
```
