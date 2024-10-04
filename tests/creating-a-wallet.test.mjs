import { RPC_GLOBAL, NIL_GLOBAL } from './globals';

import {
    Faucet,
    HttpTransport,
    LocalECDSAKeySigner,
    PublicClient,
    WalletV1,
    generateRandomPrivateKey,
    waitTillCompleted,
    bytesToHex
} from '@nilfoundation/niljs';

const RPC_ENDPOINT = RPC_GLOBAL;
const CONFIG_FILE_NAME = 'tempConfigCreatingAWallet.ini'

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const SALT = BigInt(Math.floor(Math.random() * 10000));

const CONFIG_FLAG = `--config ./tests/${CONFIG_FILE_NAME}`;

const CONFIG_COMMAND = `${NIL_GLOBAL} config init ${CONFIG_FLAG}`;
const RPC_COMMAND = `${NIL_GLOBAL} config set rpc_endpoint ${RPC_ENDPOINT} ${CONFIG_FLAG}`;
const KEYGEN_COMMAND = `${NIL_GLOBAL} keygen new ${CONFIG_FLAG}`;

//startWallet
const WALLET_CREATION_COMMAND = `${NIL_GLOBAL} wallet new --salt ${SALT} ${CONFIG_FLAG}`;
//endWallet

//startBalance
const WALLET_BALANCE_COMMAND = `${NIL_GLOBAL} wallet balance ${CONFIG_FLAG}`;
//endBalance

beforeAll(async () => {
    await exec(CONFIG_COMMAND);
    await exec(KEYGEN_COMMAND);
    await exec(RPC_COMMAND);
});

afterAll(async () => {
    await exec(`rm -rf ./tests/${CONFIG_FILE_NAME}`);
});

describe.sequential('initial CLI tests', () => {
    test.sequential('wallet creation command creates a wallet', async () => {
        const pattern = /New wallet address/;
        await exec(KEYGEN_COMMAND);
        const { stdout, stderr } = await exec(WALLET_CREATION_COMMAND);
        expect(stdout).toMatch(pattern);
    });

    test.sequential('wallet balance command returns balance', async () => {
        const pattern = /Wallet balance/;
        const { stdout, stderr } = await exec(WALLET_BALANCE_COMMAND);
        expect(stdout).toMatch(pattern);
    });
});

describe.sequential('niljs test', () => {
    test.sequential('niljs snippet can create and deploy a wallet', async () => {
        //startNilJSWalletCreation
        const client = new PublicClient({
            transport: new HttpTransport({
                endpoint: RPC_ENDPOINT,
            }),
            shardId: 1,
        });

        const faucet = new Faucet(client);

        const signer = new LocalECDSAKeySigner({
            privateKey: generateRandomPrivateKey(),
        });

        const pubkey = await signer.getPublicKey();

        const wallet = new WalletV1({
            pubkey: pubkey,
            client,
            signer,
            shardId: 1,
            salt: SALT,
        });

        const walletAddress = wallet.getAddressHex();

        const fundingWallet = await faucet.withdrawToWithRetry(
            walletAddress,
            300_000_000n,
        );

        await wallet.selfDeploy(true);

        //endNilJSWalletCreation
        expect(walletAddress).toBeDefined();
        const walletCode = await client.getCode(walletAddress, "latest");
        expect(walletCode).toBeDefined();
        expect(walletCode.length).toBeGreaterThan(10);
    });
});




