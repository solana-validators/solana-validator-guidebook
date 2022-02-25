---
sidebar_position: 1
---

# What is a Validator?

A validator is a computer that helps to run the
Solana network.  Without validators, Solana would not be able to function.

In order for the Solana network to be robust and secure, the network of validators must be decentralized. In other words, each validator should be run by an independent entity or person. Ideally, the validators should be in different geographic locations.  These measures help to avoid catestrophic issues (flooding, fire, natural disaster, etc) taking down the network. If a single validator goes offline for any reason, that will be ok as long as a super majority of validators are online and working appropriately.

To better understand what your validator is doing, it would help to understand how the Solana network functions in more depth.

## Proof Of Stake

Proof of stake is the blockchain system that is used in Solana.  It is called proof of stake because token holders can stake their tokens to a validator of their choice. When a person stakes their tokens, that person still owns the tokens and can remove the stake at any time.  The staked tokens represent your trust in that validator.  When a person stakes their tokens to a validator, they are given a return of more tokens as a reward for helping to run and secure the network.  The more tokens you have staked to a validator the more rewards you receive.  A validator that has a large amount of tokens staked to it, is considered to be more trust worthy, and therefore has proportionally larger voting power in the network.

A proof of stake network relies on validators voting on new items that are being added to the blockchain.  Each validator gets a turn to vote. In solana, the amount of voting that a validator does is proportional to the stake that is delegated to that validator.


## Proof of Work: Environmental Impact

Solana is not a proof of work system.  In a proof of work system, a computer (often called a miner), is attempting to solve a cryptographic problem before anyone else on the network is able to solve it.  The more often the computer solves these problems, the more rewards you receive. Because of the incentive to solve a hard computational problem first, miners often use many computers at the same time.  The number of computers used to solve these problems leads to large environmental challenges.

Solana, in contrast, does not incentivize validators to use many computers to solve a computational problem. Because a validator would like to have a larger amount staked to it, there is no real advantage for an independent validator to using many different computers.  You can see a comparison of Solana's environmental impact [here](https://solana.com/news/solana-energy-usage-report-november-2021).

## Solana Consensus

