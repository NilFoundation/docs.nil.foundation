import {
  Faucet,
  HttpTransport,
  LocalECDSAKeySigner,
  PublicClient,
  WalletV1,
  generateRandomPrivateKey,
  convertEthToWei,
  waitTillCompleted,
  hexToBigInt,
  bytesToHex,
  toHex,
  externalDeploymentMessage,
  ExternalMessageEnvelope,
  hexToBytes,
} from "@nilfoundation/niljs";

import { encodeFunctionData, decodeFunctionResult } from "viem";

import { RPC_GLOBAL, NIL_GLOBAL, NODE_MODULES } from "./globals";

const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIG_FILE_NAME = "tempWorkingWithSmartContractsNilJS.ini";

const CONFIG_FLAG = `--config ./tests/${CONFIG_FILE_NAME}`;
const CONFIG_COMMAND = `${NIL_GLOBAL} config init ${CONFIG_FLAG}`;

const KEYGEN_COMMAND = `${NIL_GLOBAL} keygen new ${CONFIG_FLAG}`;
const RPC_ENDPOINT = RPC_GLOBAL;

const RPC_COMMAND = `${NIL_GLOBAL} config set rpc_endpoint ${RPC_ENDPOINT} ${CONFIG_FLAG}`;

const RETAILER_COMPILATION_COMMAND =
  `solc -o ./tests/Retailer --bin --abi ./tests/Retailer.sol --overwrite ${NODE_MODULES}`;

const MANUFACTURER_COMPILATION_COMMAND =
  `solc -o ./tests/Manufacturer --bin --abi ./tests/Manufacturer.sol --overwrite ${NODE_MODULES}`;

let RETAILER_BYTECODE;
let RETAILER_ABI;
let MANUFACTURER_BYTECODE;
let MANUFACTURER_ABI;

beforeAll(async () => {
  await exec(CONFIG_COMMAND);
  await exec(KEYGEN_COMMAND);
  await exec(RPC_COMMAND);
});

afterAll(async () => {
  await exec(`rm -rf ./tests/${CONFIG_FILE_NAME}`);
});

describe.sequential("Nil.js deployment tests", async () => {
  test.sequential(
    "compiling of Retailer and Manufacturer is successful",
    async () => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const RETAILER_COMPILATION_PATTERN =
        /Function state mutability can be restricted to pure/;
      const MANUFACTURER_COMPILATION_PATTERN = /Compiler run successful/;
      let { stdout, stderr } = await exec(RETAILER_COMPILATION_COMMAND);
      expect(stderr).toMatch(RETAILER_COMPILATION_PATTERN);
      ({ stdout, stderr } = await exec(MANUFACTURER_COMPILATION_COMMAND));
      expect(stdout).toMatch(MANUFACTURER_COMPILATION_PATTERN);

      RETAILER_BYTECODE = `0x${fs.readFileSync(path.join(__dirname, "./Retailer/Retailer.bin"), "utf-8")}`;
      RETAILER_ABI = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "./Retailer/Retailer.abi"),
          "utf-8",
        ),
      );
      MANUFACTURER_BYTECODE = `0x${fs.readFileSync(path.join(__dirname, "./Manufacturer/Manufacturer.bin"), "utf-8")}`;
      MANUFACTURER_ABI = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "./Manufacturer/Manufacturer.abi"),
          "utf-8",
        ),
      );
    },
  );

  test.skip.sequential(
    "internal deployment: Retailer and Manufacturer can exchange messages",
    async () => {
      //startInternalDeployOfRetailer
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
      const gasPrice = await client.getGasPrice(1);

      const pubkey = await signer.getPublicKey();
      const wallet = new WalletV1({
        pubkey: pubkey,
        salt: BigInt(Math.floor(Math.random() * 10000)),
        shardId: 1,
        client,
        signer,
      });

      const walletAddress = wallet.getAddressHex();
      await faucet.withdrawToWithRetry(walletAddress, convertEthToWei(1));
      await wallet.selfDeploy(true);

      const { address: retailerAddress, hash: retailerDeploymentHash } =
        await wallet.deployContract({
          bytecode: RETAILER_BYTECODE,
          abi: RETAILER_ABI,
          args: [],
          value: 0n,
          feeCredit: 10_000_000n * gasPrice,
          salt: BigInt(Math.floor(Math.random() * 10000)),
          shardId: 1,
        });

      const receiptsRetailer = await waitTillCompleted(
        client,
        1,
        retailerDeploymentHash,
      );
      //endInternalDeployOfRetailer
      expect(receiptsRetailer.some((receipt) => !receipt.success)).toBe(false);
      const retailerCode = await client.getCode(retailerAddress, "latest");

      expect(retailerCode).toBeDefined();
      expect(retailerCode.length).toBeGreaterThan(10);

      //startInternalDeployOfManufacturer
      const shardTwoClient = new PublicClient({
        transport: new HttpTransport({
          endpoint: RPC_ENDPOINT,
        }),
        shardId: 2,
      });

      const { address: manufacturerAddress, hash: manufacturerDeploymentHash } =
        await wallet.deployContract({
          bytecode: MANUFACTURER_BYTECODE,
          abi: MANUFACTURER_ABI,
          args: [bytesToHex(pubkey), retailerAddress],
          value: 0n,
          feeCredit: 1000000n * gasPrice,
          salt: BigInt(Math.floor(Math.random() * 10000)),
          shardId: 2,
        });

      const manufacturerReceipts = await waitTillCompleted(
        client,
        1,
        manufacturerDeploymentHash,
      );
      //endInternalDeployOfManufacturer

      expect(manufacturerReceipts.some((receipt) => !receipt.success)).toBe(
        false,
      );
      const manufacturerCode = await client.getCode(
        manufacturerAddress,
        "latest",
      );

      expect(manufacturerCode).toBeDefined();
      expect(manufacturerCode.length).toBeGreaterThan(10);

      //startRetailerSendsMessageToManufacturer
      const hashFunds = await faucet.withdrawToWithRetry(
        retailerAddress,
        5_000_000n,
      );

      await waitTillCompleted(client, 1, hashFunds);

      const hashProduct = await wallet.sendMessage({
        to: retailerAddress,
        data: encodeFunctionData({
          abi: RETAILER_ABI,
          functionName: "orderProduct",
          args: [manufacturerAddress, "another-product"],
        }),
        feeCredit: 3_000_000n,
      });

      const productReceipts = await waitTillCompleted(client, 1, hashProduct);
      //endRetailerSendsMessageToManufacturer

      expect(productReceipts.some((receipt) => !receipt.success)).toBe(false);

      //startRetailerRetrievesTheResult
      const resultsCall = await client.call(
        {
          from: manufacturerAddress,
          to: manufacturerAddress,
          data: encodeFunctionData({
            abi: MANUFACTURER_ABI,
            functionName: "getProducts",
            args: [],
          }),
        },
        "latest",
      );

      console.log(
        "getProducts",
        decodeFunctionResult({
          abi: MANUFACTURER_ABI,
          functionName: "getProducts",
          data: resultsCall,
        }),
      );
      //endRetailerRetrievesTheResult
    },
    50000,
  );

  test.sequential(
    "external deployment: Retailer and Manufacturer can exchange messages",
    async () => {
      //startExternalDeployOfRetailer
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

      const chainId = await client.chainId();

      const deploymentMessageRetailer = externalDeploymentMessage(
        {
          salt: BigInt(Math.floor(Math.random() * 10000)),
          shard: 1,
          bytecode: RETAILER_BYTECODE,
        },
        chainId,
      );

      const addressRetailer = bytesToHex(deploymentMessageRetailer.to);
      const faucetHashRetailer = await faucet.withdrawToWithRetry(
        addressRetailer,
        convertEthToWei(1),
      );
      await waitTillCompleted(client, 1, faucetHashRetailer);

      const receipts = await deploymentMessageRetailer.send(client);

      await waitTillCompleted(client, 1, receipts);
      //endExternalDeployOfRetailer

      const code = await client.getCode(addressRetailer, "latest");

      expect(code).toBeDefined();
      expect(code.length).toBeGreaterThan(10);

      //startExternalDeployOfManufacturer
      const clientTwo = new PublicClient({
        transport: new HttpTransport({
          endpoint: RPC_ENDPOINT,
        }),
        shardId: 2,
      });
      const deploymentMessageManufacturer = externalDeploymentMessage(
        {
          salt: BigInt(Math.floor(Math.random() * 10000)),
          shard: 2,
          bytecode: MANUFACTURER_BYTECODE,
          abi: MANUFACTURER_ABI,
          args: [bytesToHex(pubkey), addressRetailer],
        },
        chainId,
      );

      const addressManufacturer = bytesToHex(deploymentMessageManufacturer.to);
      const faucetHashManufacturer = await faucet.withdrawToWithRetry(
        addressManufacturer,
        convertEthToWei(1),
      );
      await waitTillCompleted(client, 1, faucetHashManufacturer);

      const receiptsManufacturer = await deploymentMessageManufacturer.send(client);

      await waitTillCompleted(clientTwo, 2, receiptsManufacturer);
      //endExternalDeployOfManufacturer

      const codeManufacturer = await client.getCode(
        addressManufacturer,
        "latest",
      );

      expect(codeManufacturer).toBeDefined();
      expect(codeManufacturer.length).toBeGreaterThan(10);

      //startExternalSendMessageToRetailer;
      const orderMessage = new ExternalMessageEnvelope({
        isDeploy: false,
        to: hexToBytes(addressRetailer),
        chainId,
        data: hexToBytes(
          encodeFunctionData({
            abi: RETAILER_ABI,
            functionName: "orderProduct",
            args: [addressManufacturer, "new-product"],
          }),
        ),
        authData: new Uint8Array(0),
        seqno: await client.getMessageCount(addressRetailer),
      });

      const encodedOrderMessage = orderMessage.encode();

      let success = false;
      let orderMessageHash;

      while (!success) {
        try {
          orderMessageHash = await client.sendRawMessage(
            bytesToHex(encodedOrderMessage),
          );
          success = true;
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      const orderReceipts = await waitTillCompleted(
        client,
        1,
        orderMessageHash,
      );
      //endExternalSendMessageToRetailer
      expect(orderReceipts.some((receipt) => !receipt.success)).toBe(false);
    },
    50000,
  );
});
