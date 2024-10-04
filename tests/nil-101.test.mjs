import { RPC_GLOBAL, NIL_GLOBAL, NODE_MODULES } from './globals';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

let salt = BigInt(Math.floor(Math.random() * 10000));

const RPC_ENDPOINT = RPC_GLOBAL;
const CONFIG_FILE_NAME = 'tempConfigNil101.ini';

const CONFIG_FLAG = `--config ./tests/${CONFIG_FILE_NAME}`;

//startKeygen
const KEYGEN_COMMAND = `${NIL_GLOBAL} keygen new ${CONFIG_FLAG}`;
//endKeygen

//startEndpoint
const RPC_COMMAND = `${NIL_GLOBAL} config set rpc_endpoint ${RPC_ENDPOINT} ${CONFIG_FLAG}`;
//endEndpoint

//startWallet
const WALLET_CREATION_COMMAND = `${NIL_GLOBAL} wallet new ${CONFIG_FLAG}`;
//endWallet

//startTopup
const WALLET_TOP_UP_COMMAND = `${NIL_GLOBAL} wallet top-up 1000000 ${CONFIG_FLAG}`;
//endTopup

//startInfo
const WALLET_INFO_COMMAND = `${NIL_GLOBAL} wallet info ${CONFIG_FLAG}`;
//endInfo

//startCompilation
const COUNTER_COMPILATION_COMMAND = `solc -o ./tests/Counter --bin --abi ./tests/Counter.sol --overwrite ${NODE_MODULES}`;
//endCompilation

//startDeploy
const COUNTER_DEPLOYMENT_COMMAND = `${NIL_GLOBAL} wallet deploy ./tests/Counter/Counter.bin --salt ${salt} ${CONFIG_FLAG}`;
//endDeploy

let COUNTER_ADDRESS;

//startCallerCompilation
const CALLER_COMPILATION_COMMAND = `solc -o ./tests/Caller --bin --abi ./tests/Caller.sol --overwrite ${NODE_MODULES}`;
//endCallerCompilation

//start_CallerDeploy
const CALLER_DEPLOYMENT_COMMAND = `${NIL_GLOBAL} wallet deploy ./tests/Caller/Caller.bin --shard-id 2 --salt ${salt} ${CONFIG_FLAG}`;
//end_CallerDeploy

let CALLER_ADDRESS;

//startNewWalletDeploy
const NEW_WALLET_COMMAND = `${NIL_GLOBAL} wallet new --salt ${salt} ${CONFIG_FLAG}`;
//endNewWalletDeploy

let NEW_WALLET_ADDRESS;

beforeAll(async () => {
  await exec(`${NIL_GLOBAL} config init ${CONFIG_FLAG}`);
});

afterAll(async () => {
  await exec(`rm -rf ./tests/${CONFIG_FILE_NAME}`);
});

describe.sequential('initial wallet setup tests', () => {
  test.sequential('keygen generation works via CLI', async () => {
    const pattern = /\bPrivate key: [a-f0-9]{64}\b/;
    const { stdout, stderr } = await exec(KEYGEN_COMMAND);
    expect(stdout).toMatch(pattern);
  });

  test.sequential('endpoint command should set the endpoint', async () => {
    const pattern = /Set "rpc_endpoint" to /;
    const { stdout, stderr } = await exec(RPC_COMMAND);
    expect(stderr).toMatch(pattern);
  });

  test.sequential('wallet creation command creates a wallet', async () => {
    const pattern = /New wallet address/;
    const { stdout, stderr } = await exec(WALLET_CREATION_COMMAND);
    expect(stdout).toMatch(pattern);
  });

  test.sequential('wallet top-up command tops up the wallet', async () => {
    const pattern = /Wallet balance/;
    const { stdout, stderr } = await exec(WALLET_TOP_UP_COMMAND);
    expect(stdout).toMatch(pattern);
  });
});

describe.sequential('incrementer tests', () => {
  beforeEach(() => {
    salt = BigInt(Math.floor(Math.random() * 10000));
  });
  test.sequential('wallet info command supplies info', async () => {
    const pattern = /Wallet address/;
    const { stdout, stderr } = await exec(WALLET_INFO_COMMAND);
    expect(stdout).toMatch(pattern);
  });

  test.sequential('deploy of incrementer works successfully', async () => {
    const pattern = /Contract address:/;
    const addressPattern = /0x[a-fA-F0-9]{40}/g;
    await exec(COUNTER_COMPILATION_COMMAND);
    const { stdout, stderr } = await exec(COUNTER_DEPLOYMENT_COMMAND);
    expect(stdout).toMatch(pattern);
    const addressMatches = stdout.match(addressPattern);
    COUNTER_ADDRESS = addressMatches.length > 1 ? addressMatches[1] : null;
  });

  test.sequential('execution of increment produces a message', async () => {
    //startIncrement
    const COUNTER_INCREMENT_COMMAND = `${NIL_GLOBAL} wallet send-message ${COUNTER_ADDRESS} increment --abi ./tests/Counter/Counter.abi ${CONFIG_FLAG}`;
    //endIncrement
    const pattern = /Message hash:/;
    const { stdout, stderr } = await exec(COUNTER_INCREMENT_COMMAND);
    expect(stdout).toMatch(pattern);

  });

  test.sequential('call to incrementer returns the correct value', async () => {
    //start_CallToIncrementer
    const COUNTER_CALL_READONLY_COMMAND = `${NIL_GLOBAL} contract call-readonly ${COUNTER_ADDRESS} getValue --abi ./tests/Counter/Counter.abi ${CONFIG_FLAG}`;
    //end_CallToIncrementer
    const { stdout, stderr } = await exec(COUNTER_CALL_READONLY_COMMAND);

    const normalize = str => str.replace(/\r\n/g, '\n').trim();

    const expectedOutput = "Success, result:\nuint256: 1";
    const receivedOutput = normalize(stdout);

    expect(receivedOutput).toBe(expectedOutput);
  });
});

describe.sequential("caller tests", () => {
  beforeEach(() => {
    salt = BigInt(Math.floor(Math.random() * 10000));
  });
  test.sequential('deploy of caller works successfully', async () => {
    const pattern = /Contract address:/;
    const addressPattern = /Contract address:\s*(0x[a-fA-F0-9]{40})/;
    await exec(CALLER_COMPILATION_COMMAND);
    const { stdout, stderr } = await exec(CALLER_DEPLOYMENT_COMMAND);
    expect(stdout).toMatch(pattern);
    const addressMatches = stdout.match(addressPattern);
    CALLER_ADDRESS = addressMatches && addressMatches.length > 0 ? addressMatches[1] : null;
    expect(CALLER_ADDRESS).not.toBeNull();
  });

  test.sequential('caller can call incrementer successfully', async () => {
    //start_SendTokensToCaller
    const SEND_TOKENS_COMMAND = `${NIL_GLOBAL} wallet send-tokens ${CALLER_ADDRESS} 300000 ${CONFIG_FLAG}`;
    //end_SendTokensToCaller

    //startMessageFromCallerToIncrementer
    const SEND_FROM_CALLER_COMMAND = `${NIL_GLOBAL} wallet send-message ${CALLER_ADDRESS} call ${COUNTER_ADDRESS} --abi ./tests/Caller/Caller.abi ${CONFIG_FLAG}`;
    //endMessageFromCallerToIncrementer

    await exec(SEND_TOKENS_COMMAND);
    const pattern = /Message hash:/;
    const { stdout, stderr } = await exec(SEND_FROM_CALLER_COMMAND);
    expect(stdout).toMatch(pattern);

    const COUNTER_CALL_READONLY_COMMAND_POST_CALLER = `${NIL_GLOBAL} contract call-readonly ${COUNTER_ADDRESS} getValue --abi ./tests/Counter/Counter.abi ${CONFIG_FLAG}`;

    let stdoutCall;
    let stderrCall;

    try {
      for (let attempt = 0; attempt < 5; attempt++) {
        ({ stdout: stdoutCall, stderr: stderrCall } = await exec(COUNTER_CALL_READONLY_COMMAND_POST_CALLER));

        if (stdoutCall) {
          break;
        }

        console.log(`Attempt ${attempt + 1}: Retrying after a short delay...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (!stdoutCall) {
        throw new Error("Failed to get output from the contract call after multiple attempts.");
      }

      const normalize = str => str.replace(/\r\n/g, '\n').trim();

      const expectedOutput = "Success, result:\nuint256: 2";
      const receivedOutput = normalize(stdoutCall);

      expect(receivedOutput).toBe(expectedOutput);
    } catch (error) {
      console.error("Error during the contract call:", error);
      if (stderrCall) {
        console.error("stderrCall:", stderrCall);
      }
      throw error;
    }
  });
});

describe.sequential('tokens tests', () => {
  test.sequential('a new wallet is created successfully', async () => {
    const pattern = /New wallet address/;
    const { stdout, stderr } = await exec(NEW_WALLET_COMMAND);
    expect(stdout).toMatch(pattern);
    const addressPattern = /New wallet address:\s*(0x[a-fA-F0-9]{40})/;
    const addressMatches = stdout.match(addressPattern);
    NEW_WALLET_ADDRESS = addressMatches && addressMatches.length > 0 ? addressMatches[1] : null;
  });

  test.sequential('a new currency is created and withdrawn successfully', async () => {
    const pattern = /50000/;

    //startMintCurrency
    const MINT_CURRENCY_COMMAND = `${NIL_GLOBAL} minter create-currency ${NEW_WALLET_ADDRESS} 50000 new-currency ${CONFIG_FLAG}`;
    //endMintCurrency

    //startWithdrawCurrency
    const WITHDRAW_CURRENCY_COMMAND = `${NIL_GLOBAL} minter withdraw-currency ${NEW_WALLET_ADDRESS} 50000 ${NEW_WALLET_ADDRESS} ${CONFIG_FLAG}`;
    //endWithdrawCurrency
    await exec(MINT_CURRENCY_COMMAND);
    await exec(WITHDRAW_CURRENCY_COMMAND);

    //startCurrenciesCheck
    const CURRENCIES_COMMAND = `${NIL_GLOBAL} contract currencies ${NEW_WALLET_ADDRESS} ${CONFIG_FLAG}`;
    //endCurrenciesCheck

    const { stdout, stderr } = await exec(CURRENCIES_COMMAND);
    expect(stdout).toMatch(pattern);
  });
});
