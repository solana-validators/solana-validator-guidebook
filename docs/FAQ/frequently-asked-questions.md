# Frequently Asked Questions

### How long does it take for new stake to show up for my validator?

You will have to wait until the next epoch. Each epoch is approximately 2 days. You can get information about the current epoch using `solana epoch-info`.

### Can I run my validator at home?

Anyone can join the cluster including home users. However, you must make sure that your system can perform well and keep up with the cluster. Many home internet connections are not suitable to run a Solana validator.  See the [validator system requirements](https://docs.solana.com/running-validator/validator-reqs) for more information.

### Is running a validator the same as mining?

No, a validator uses proof of stake instead of proof of work.  See [what is a validator?](/solana-introduction/what-is-a-validator).

### What are the 3 keys (identity, voting, withdrawer) used for in my validator?

_Identity_: This keypair is used as a payment account for the sol transaction fees incurred on the network. It must be stored on the validator server for the `solana-validator` program to operate.

_Vote_: This keypair is used to create your vote account. The account is identified by the keypair's pubkey. Once the vote account is created, the keypair can be deleted.

_Withdrawer_: This keypair allows the operator of the validator to withdraw funds awarded to the validator. It should not be kept on the validator itself.  The keypair should be stored in a secure place like a hardware wallet or key storage system.

### Should I store my withdrawer key on my validator?

No, do not store your withdrawer key on your validator.

### Can my withdrawer key be the same as my identity key?

No, the withdrawer key should not be stored on the validator and should not be the same keypair.

### What does catching up to the cluster mean?

When a validator node starts up, it must either download a snapshot or use a local snapshot. This snapshot represents the state of the cluster, but the cluster may have advanced beyond your local snapshot by the time your node starts.  In order for your node to be involved in voting, it must download all of the blocks that it does not have in its snapshot. This process is known as catching up to the cluster.  You will have to do this almost any time you stop and then restart your validator service.

### How can you check if your node has caught up to the cluster?

If you have RPC opened up, you can check this using `solana catchup <pubkey>`

If you are running with `--private-rpc` however, you will need to use `solana catchup --our-localhost 8899`

### How do you find your pubkey?

`solana-keygen pubkey validator-keypair.json`
