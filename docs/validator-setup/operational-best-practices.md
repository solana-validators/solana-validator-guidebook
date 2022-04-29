---
sidebar_position: 2
---

# Operational Best Practices

After you have successfully gotten a validator running on testnet (or another cluster of your choice), you will want to become familiar with how to operate your validator on a day to day basis.  During daily operations, you will be monitoring your server, updating software regularly (both the solana validator software as well as the ubuntu software), and managing your stake account and identity account.  All of these skills are critical to practice.  You do not want to accidentally cause a prolonged outage of your validator when it is running on mainnet.

## Restarting Your Validator

There are many operational reasons where you may want to restart your validator.  As a best practice, you will want to avoid a restart during a leader slot.  A leader slot is the time when your validator is expected to produce blocks.  You do not want to miss out on that time and miss the rewards.

The `solana-validator` command provides an `exit` subcommand that stops your validator when there is a restart window. To execute the command do:

```
solana-validator exit
```

For more information use `--help`:

```
solana-validator --help
```

## Upgrading

There are many ways to upgrade the solana software and as an operator, you will need to do this fairly often.  One option is to use `solana-install` to install a specific version.  Assuming you want to install solana version `1.10.11`, you would execute the following:

```
solana-install init 1.10.11
```

This command download the executable for `1.10.11` and installs it into a `.local` directory.  You can also look at `solana-install --help` for more options.

## Using Local Snapshots

Startup time for your validator is important, because you want to minimize downtime as much as possible.  If your downtime was short lived and you have a recent snapshot of the ledger on your local hard drive, you can avoid some startup time by skipping the snapshot fetching that that the validator will do by default.  In your startup script, add the following flag to the `solana-validator` command:

```
--no-snapshot-fetch
```

If you use this command, make sure that you run `solana catchup <pubkey>` after your validator starts to make sure that the validator is catching up in a reasonable time.  If the snapshot that you are using locally is too old, it may be faster to use a snapshot from another validator instead.  You will have to experiment with this flag to figure out what works best for you.

## Regularly Check Account Balances

As an operator, you have you do not want to accidentally run out of funds in your identity account, but you also do not want to put a large amount of sol in that identity account since the key must be stored on the server in order to run the `solana-validator` program. As a security precaution, you should only keep a small amount of sol in the identity key and refill it regularly.  How much sol you should store there is up to your and your comfort level.  Assuming you check the account weekly, but want some buffer, maybe 30 sol is enough.  As a reminder, to check the account balance do:

```
solana balance validator-keypair.json
```

## Regularly Withdraw From Vote Account

As a reminder, your withdrawer keypair should _never_ be stored on your server. It should be stored on a hardware wallet or another secure location that mitigates hacking and theft of funds.  To withdraw your funds from your vote account, you will need to use `solana withdraw-from-vote-account` on a separate computer.  To get more information on the command, use `solana withdraw-from-vote-account --help`.  For a more detailed explanation of the different keypairs and other related operations refer to the [vote account management page](https://docs.solana.com/running-validator/vote-accounts) of the solana docs.
