---
sidebar_position: 1
---

# What Is A Validator?

A validator is a computer that helps to run the
Solana network.  All validators execute a program that keeps track of all accounts on the Solana cluster and validates transactions being added to the network.  Without validators, Solana would not be able to function.

In order for the Solana cluster to be robust and secure, the network of validators must be decentralized. In other words, each validator should be run by an independent entity or person. Ideally, the validators should be in different geographic locations.  These measures help to avoid catastrophic issues (flooding, fire, natural disaster, etc) taking down the network.  You can see a visualization of the state of the cluster at [solanabeach.io](https://solanabeach.io/).

By becoming a validator, you are helping to grow the network and help make Solana more decentralized.

## Consensus vs RPC

Before, we discuss validators in more detail, it's useful to make some distinctions. Using the same validator software, you have the option of running a voting/consensus node or choosing to instead run an RPC node.  An RPC node helps Solana devs and others interact with the blockchain but for performance reasons, an RPC node should not vote.  We go into more detail on RPC nodes in the next section, [what is an rpc node](/solana-introduction/what-is-an-rpc-node).

For this document, when a validator is mentioned, we are talking about a voting or consensus node. Now, to better understand what your validator is doing, it would help to understand how the Solana network functions in more depth.

## Proof Of Stake

Proof of stake is the blockchain architecture that is used in Solana.  It is called proof of stake because token holders can stake their tokens to a validator of their choice. When a person stakes their tokens, that person still owns the tokens and can remove the stake at any time.  The staked tokens represent your trust in that validator.  When a person stakes their tokens to a validator, they are given a return of some amount of tokens as a reward for helping to run and secure the network.  The more tokens you have staked to a validator the more rewards you receive.  A validator that has a large amount of tokens staked to it is considered to be more trust worthy by the algorithm.  A validator, therefore, is given more time to produce blocks in the network proportional to the size of the stake in the validator.  The validator that is currently producing blocks in the network is known as the leader.

A proof of stake network relies on validators voting on new items that are being added to the blockchain.

## Proof Of Work: For Comparison

Solana is not a proof of work system.  In a proof of work system, a computer (often called a miner), is attempting to solve a cryptographic problem before anyone else on the network is able to solve it.  The more often the computer solves these problems, the more rewards you receive. Because of the incentive to solve a hard computational problem first, miners often use many computers at the same time.  The number of computers used to solve these problems leads to large environmental challenges.

Solana, in contrast, does not incentivize validators to use many computers to solve a computational problem. Because a validator would like to have a larger amount staked to it, there is no real advantage for an independent validator to using many different computers.  You can see a comparison of Solana's environmental impact [here](https://solana.com/news/solana-energy-usage-report-november-2021).

## Proof Of History

Proof of history, PoH, is a feature that was first introduced by the Solana architecture.  PoH is one of the key innovations in Solana that allows transactions to be finalized very quickly. At a high level, PoH allows validators in the cluster to agree on a cryptographically repeatable clock, but PoH is not a consensus mechanism.

Understanding how PoH works is not necessary to run a good validator, but a very approachable discussion can be found [here](https://medium.com/solana-labs/proof-of-history-explained-by-a-water-clock-e682183417b8).  Also, the [Solana whitepaper](https://solana.com/solana-whitepaper.pdf) does a good job of explaining the algorithm in an approachable way for the more technically minded.

## Your Role As A Validator

As a validator, you are helping to secure the network and to improve decentralization.  You are part of the discussion of changes on the network and you will be participating in the ecosystem at a foundational level. You are also assuming a responsibility to keep your system running properly, to make sure your system is secure, and to keep it up to date with the latest software.  As more individuals stake their tokens to your validator, you want to reward their trust by running a high performing and reliable validator.  Hopefully, your validator is preforming well a majority of the time, but you should also have systems in place to respond to an outage at any time of the day. If your validator is not responding late at night, someone (either you or other team members) need to be available to investigate and fix the issues.

Running a validator is a technical and important task but it can also be very rewarding. Good luck and welcome to the community.
