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

There are many ways to upgrade the Solana software.  As an operator, you will need to upgrade often, so it is important to get comfortable with this process.

### Building From Source

It is a best practice to always build your Solana binaries from source.  If you build from source, you are certain that the code you are building has not been tampered with before the binary was created. You may also be able to optimize your `solana-validator` binary to your specific hardware.  If you build from source on the validator machine (or a machine with the same CPU), you can target your specific architecture using the `-march` flag.  Refer to the [solana docs](https://docs.solana.com/cli/install-solana-cli-tools#build-from-source) for instructions on building from source.


### solana-install

If you are not comfortable building from source or you need to quickly install a new version to test somethings out, you could instead try using the `solana-install` command. Assuming you want to install solana version `1.10.13`, you would execute the following:

```
solana-install init 1.10.13
```

This command downloads the executable for `1.10.13` and installs it into a `.local` directory.  You can also look at `solana-install --help` for more options.

## Using Local Snapshots

Startup time for your validator is important, because you want to minimize downtime as much as possible.  If your downtime was short lived and you have a recent snapshot of the ledger on your local hard drive, you can avoid some startup time by skipping the snapshot fetching that that the validator will do by default.  In your startup script, add the following flag to the `solana-validator` command:

```
--no-snapshot-fetch
```

If you use this flag with the `solana-validator` command, make sure that you run `solana catchup <pubkey>` after your validator starts to make sure that the validator is catching up in a reasonable time.  If the snapshot that you are using locally is too old, it may be faster to use a snapshot from another validator.  Be aware that using a snapshot instead of catching up will likely result in missing blocks in your local copy of the ledger.  Because of these trade offs, you will have to experiment with this flag to figure out what works best for you.

## Regularly Check Account Balances

It is important that you do not accidentally run out of funds in your identity account, as your node will stop voting.  However, this account is somewhat vulnerable because the keypair for the account must be stored on your validator to run the `solana-validator` software. How much SOL you should store there is up to you.  As a best practice, make sure to check the account regularly and refill it as needed.  To check the account balance do:

```
solana balance validator-keypair.json
```

## Regularly Withdraw From Vote Account

As a reminder, your withdrawer keypair should _never_ be stored on your server. It should be stored on a hardware wallet or another secure location that mitigates hacking and theft of funds.  To withdraw your funds from your vote account, you will need to use `solana withdraw-from-vote-account` on a separate computer.  To get more information on the command, use `solana withdraw-from-vote-account --help`.  For a more detailed explanation of the different keypairs and other related operations refer to the [vote account management page](https://docs.solana.com/running-validator/vote-accounts) of the solana docs.
