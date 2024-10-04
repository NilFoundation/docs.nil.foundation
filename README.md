# docs.nil.foundation

This repository houses the public documentation for =nil; Foundation. 

## Usage

Clone the repo:

```bash
git clone git@github.com:NilFoundation/docs.nil.foundation.git
```

Install all dependencies:

```bash
cd docs.nil.foundation
yarn
```

Run an interactive preview:

```bash
yarn start
```

Build all docs and serve them locally:

```bash
yarn build
yarn serve
```

# Structure

The project follows the monorepo pattern to simplify dependency management.

There exist four separate sets of docs contained in the following folders.

* `./zkllvm`
* `./proof-market`
* `./nil`
* `./crypto3`

Note that only =nil; docs are rendered when running the Docusaurus instance. The rest only exist as collections of raw `.md` files.

# Contributing

Perform the following actions if something needs to be changed in the docs:

* Click on [Issues](https://github.com/NilFoundation/docs.nil.foundation/issues)
* Select **New issue**
* Select a suitable issue template
* Fill the template and submit the issue

Alternatively:

* Create a new branch
* Make the necessary changes
* Open a PR into `main` and request a review
