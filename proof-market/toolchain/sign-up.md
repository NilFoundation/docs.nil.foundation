# Sign up

Access to Proof Market requires authentication.

Make sure you have a valid username and password.

If you have not registered, please look at the instructions on how to do so [via the web interface](../market/web-interface#creating-an-account).

Or use the following commands from the `proof-market-toolchain` repository.

## User

Signup for an ordinary user through CLI looks like this:

```bash
python3 scripts/signup.py user \
    --user <username> \
    --password <password> \
    --email <e-mail>
```

If the signup is successful, this command creates `.user` and `.secret` files with your credentials in the `scripts` directory.

All users can submit and retrieve orders on Proof Market, but only proof producers can generate and submit proofs.

## Proof producer

First, you should [sign up](#user) or [sign in](../toolchain/cli-reference/user#signing-in) as a regular user, and then you can register yourself as a proof producer:

```bash
python3 scripts/signup.py producer \
    --eth_address <producer's Ethereum address> \
    [--description <producer's description>] \
    [--url <link to a website>] \
    [--logo <logo>]
```

Note that only the Ethereum address is a required parameter, the others are optional.
