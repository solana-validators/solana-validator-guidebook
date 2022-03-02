---
sidebar_position: 2
---

# What is an RPC Node?

An RPC (Remote Procedure Call) node runs the same software as a validator but it does not participate in the consensus process.  Technically you could run the RPC software and also allow your node to vote as a consensus node, but it is strongly discouraged because your node will not be performant enough to do either task well.

A node that runs RPC has a much different purpose in the cluster. An RPC node responds to requests about the blockchain and also allows users of the RPC node to create new transactions on the blockchain.  For example, a website might request to transfer tokens from wallet A to wallet B (given wallet A's permission).  That transaction would have to talk to an RPC node to be completed.  So you could think of running an RPC node as a similar engineering task to providing an api for others to use.

The users of the RPC node are often developers, so this option may require a more technical understanding of Solana.  To better understand RPC node operations, you'll want to become familiar with the different RPC calls.  The Solana docs on RPC are [here](https://docs.solana.com/developing/clients/jsonrpc-api).
