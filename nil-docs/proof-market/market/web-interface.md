---
description: Web interface of Proof Market
---

# Web interface

The web interface of Proof Market can be accessed at [proof.market](https://proof.market).

:::info

Please note this product is in beta and expected to change.

:::

## Creating an account

To interact with Proof Market, create an account at [proof.market](https://proof.market/#/register) or [through the command-line interface](../toolchain/cli-reference/user).

Without an account, you can view the exchange, but you won't be able to post orders to buy or sell proofs.

To register a new user via the web interface, go to the [Sign up](https://proof.market/#/register) page or select **Sign in** > **Sign up** from the main page:

![](../../static/img/proof-market/sign-in.png)

Enter your username and password and complete the flow by clicking on **Register**.

![](../../static/img/proof-market/sign-up.png)

## Logging in

If you're a registered user, go to the [Sign in](https://proof.market/#/login) page, enter your credentials in the provided fields, and click **Login**.

![](../../static/img/proof-market/sign-in.png)

## Dashboard

The Proof Market dashboard has the following components:

- [A: Statement list](#statement-list);
- [B: Trades](#trades);
- [C: Last proof producer](#last-proof-producer);
- [D: Statement details](#statement-details);
- [E: Statement dashboard](#statement-dashboard);
- [F: Order book](#order-book);
- [G: Create orders](#create-orders);
- [H: Manage orders](#manage-orders).

![](../../static/img/proof-market/dashboard-authorized.png)

If you're not logged in, **Create orders** and **Manage orders** sections will not be available.

### Statement list

The statements list shows the [statements](mechanics#circuits-and-statements) available on Proof Market, like MINA or Solana state-proofs, and their price change in the last 24 hours.

Here you can search the statements to create an order to buy or sell proofs.

Selection of a statement in this view also affects all the other components.

![](../../static/img/proof-market/statement-list.png)

### Trades

The trades component shows all the orders executed on the marketplace for the selected statement.

![](../../static/img/proof-market/trades.png)

### Last proof producer

This section shows the username of the last proof producer on the marketplace.

![](../../static/img/proof-market/last-proof-producer.png)

### Statement details

The statement details component shows the statement's description and URL along with its aggregated marketplace stats, like average cost and generation time.

![](../../static/img/proof-market/statement-details.png)

### Statement dashboard

This dashboard has two tabs:

- Proof cost — a history of the price settlement and amount of generated proofs for this statement.

![](../../static/img/proof-market/proof-cost.png)

- Proof generation time — a history of how long did proof generation take from the time
  the order was matched to the time a proof was submitted to the market.

![](../../static/img/proof-market/proof-generation-time.png)

### Order book

The order book shows the request and proposals on the marketplace for orders which have not yet matched.

![](../../static/img/proof-market/order-book.png)

You can toggle to see your orders in the book and group them.

### Create orders

**Create orders** section is active only for logged-in users. Here you can place buy and sell orders.

You can learn more about orders and their fields on the [market mechanics page](mechanics#orders-types).

Please note that you should provide your inputs for the selected statement in the **Public Input** field.

All users can post orders for buying proofs:

![](../../static/img/proof-market/buy-order.png)

If you are registered as a proof producer, you will also be able to post sell orders:

![](../../static/img/proof-market/sell-order.png)

Otherwise, you'll see this:

![](../../static/img/proof-market/sell-order-register-as-a-producer.png)

### Manage orders

**Manage orders** section is active only for logged-in users. This view has two tabs:

- **Active orders** — all your currently [active orders](economics#orders-status),
  waiting for a match or in processing.
  Here you can cancel an active order.

![](../../static/img/proof-market/manage-orders.png)

- **History** — all your completed orders.
