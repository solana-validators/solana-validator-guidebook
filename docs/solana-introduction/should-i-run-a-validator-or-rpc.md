---
sidebar_position: 3
---

# Should I Run a Validator or an RPC Node?

Operators who run a validator have much different incentives than operators who run an RPC node.  You will have to decide where your interests and background fits best.

## Consensus Validators

As a validator your primary focus is maintaining the network and making sure that your node is performing optimally so that you can fully participate in the cluster consensus.  You will want to attract a delegation of sol to your validator which will prove that you are more trusted in the network. The more trusted nodes can produce blocks more often and will receive more rewards. A validator receives sol as rewards at the end of an epoch for participating in consensus.

Since all votes in Solana happen on the blockchain, a validator incurs a transaction cost for each vote that it makes.  These transaction fees amount to approximately 1.1 sol per day.  It is important to make sure your validator always has enough sol in the identity account to pay for the transactions.

## RPC Nodes

An rpc operator does not receive rewards because the node is not participating in voting. Instead, an rpc operator is providing a service to users who want to interact with the Solana blockchain.  Because your primary user is often technical, you will have to be able to answer technical questions about performance of RPC calls.  This option may require more understanding of the core Solana architecture.  You can read more about it in the [Solana docs](https://docs.solana.com/cluster/overview).

Your job will also involve scaling your system to meet the demands of the users. For example, some RPC providers create dedicate computers for projects that require a high volume of requests to the node. Someone with a background in development operations or software engineering will be a very important part of your team.  You will likely need a good understanding of the Solana architecture and the RPC api.
