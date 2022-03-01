# Frequently Asked Questions

* How long does it take for new stake to show up for my validator?

You will have to wait until the next epoch. Each epoch is approximately 2 days. You get information about the current epoch using `solana epoch-info`.

* Can I run my a validator at home?

Anyone can join the cluster including home users, however, you must make sure that your system can perform well and keep up with the cluster. Many home internet connections are not suitable to run a Solana validator.  See the [validator system requirements](https://docs.solana.com/running-validator/validator-reqs) for more information.

* Is a validator the same as mining?

No, a validator uses proof of stake instead of proof of work.  See [what is a validator?](docs/solana-introduction/what-is-a-validator).

* What are the 3 keys (identity, voting, withdrawer) used for in my validator?

_Identity_: This keypair is used to as a payment account for the sol transaction fees incurred on the network.

_Vote_: This keypair is useed to identify your vote account. The vote account keypair is only created for the pubkey.

_Withdrawer: This keypair allows the operater of the validator to withdraw funds rewarded to the validator. It should not be kept on the validator itself.  The keypair should be store in a secure place like a hardware wallet or key storage system.

* Should I store my withdrawer key on my validator?

No, do not store your withdrawer key on your validator.

* Can my withdrawer key be the same as my identity key?

No, the withdrawer key should not be store on the validator and should not be the same keypair.

* What does catching up to the cluster mean?

When a validator node starts up, it must either download a snapshot or use a local snapshot. This snapshot represents the state of the cluster, but the cluster may have advanced beyond your local snapshot by the time your node starts.  In order for your node to be involved in voting, it must download all of the blocks that it does not have in its snapshot. This process is known as catching up to the cluster.  You will have to do this almost any time you stop and then restart your validator service.

* How can you check if your node has caught up to the cluster?

`solana catchup <pubkey>`
