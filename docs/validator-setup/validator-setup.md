---
sidebar_position: 0
---

# Validator Setup

This is a prescriptive guide for getting your validator setup on the Solana testnet cluster.  It is opinionated by design, so feel free to adapt this guide to better fit your needs.

## Install The Solana CLI Locally

Install the solana cli on your local (secure) computer if it is not already installed: [install solana cli](https://docs.solana.com/cli/install-solana-cli-tools). Our goal here is to create the keys for our validator on a separate computer from the validator itself.

Next, change your config to make requests to the testnet cluster

```
solana config set --url https://api.testnet.solana.com
```

## Create Keys

On your local computer, Create the 3 keypairs that you will need to run your validator ([docs for reference](https://docs.solana.com/running-validator/validator-start#generate-identity)):

```
solana-keygen new -o validator-keypair.json
solana-keygen new -o vote-account-keypair.json
solana-keygen new -o authorized-withdrawer-keypair.json
```

__IMPORTANT__ the authroized-withdrawer-keypair.json should be stored in a secure place like a hardware wallet or a password protection app. It should not be stored on the validator. See the [FAQ](/docs/FAQ/) for more details.


## Create A Vote Account

Use the solana network to create a vote account.  This should be done on your local machine (not on your validator):

```
solana create-vote-account ~/vote-account-keypair.json ~/validator-keypair.json ~/authorized-withdrawer-keypair.json
```

## Save the Withdrawer Keypair Securely

Make sure your `authorized-withdrawer-keypair` is stored in a safe place, then delete it from your local machine. __Important__: if you lose your withdrawer key pair, you will not be able to withdraw tokens from the vote account and you will lose access to it.

## SSH To Your Validator

Connect to your remote server. This is specific to your server but will look something like this:

```
ssh root@my.server.hostname
```

## Update Your Ubuntu Packages

Make sure you have the latest and greatest package versions on your server

```
sudo apt update
sudo apt install
```


## Sol User

Create a new ubuntu user for running the validator.

```
sudo adduser sol
```

It is a best practice to always run your validator as a non root user (like the `sol` user we just created).

## Hard Drive Setup

On your Ubuntu computer make sure that you have at least 2TB of disk space mounted. You can check disk space using the `df` command.

```
df -h
```

If you have a drive but it is not mounted/formatted, you’ll have to follow the steps [here](https://phoenixnap.com/kb/linux-format-disk):


## System Tuning

In order for your validator to run properly, you will need to tune the system. (If you skip this step, you will likely get an out of memory error). The solana docs have a discussion of the options [here](https://docs.solana.com/running-validator/validator-start#system-tuning), but the `solana-sys-tuner` will work well for us. Run the following:

```
sudo $(command -v solana-sys-tuner) --user sol) > sys-tuner.log 2>&1
```

## Switch to Sol User

To run the validator, we want to use the sol user:

```
su - sol
```

## Copy Key Pairs

On your local computer (not on the validator).  Securely copy your validator-keypair.json file and your vote-account-keypair.json file.

```
scp validator-keypair.json sol@my.server.hostname:
scp vote-account-keypair.json sol@my.server.hostname:
```

## Create A Validator Startup Script

In your sol home directory (`/home/sol/`), create a folder called bin. Inside that folder create a file called validator.sh

```
mkdir -p /home/sol/bin
touch /home/sol/bin/validator.sh
chmod +x /home/sol/bin/validator.sh
```

Next, Paste [this command](https://docs.solana.com/clusters#testnet) in a validator.sh file

```
nano /home/sol/bin/validator.sh
```
Copy and paste the following into your validator.sh file:

```
solana-validator \
    --identity validator-keypair.json \
    --vote-account vote-account-keypair.json \
    --known-validator 5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on \
    --known-validator 7XSY3MrYnK8vq693Rju17bbPkCN3Z7KvvfvJx4kdrsSY \
    --known-validator Ft5fbkqNa76vnsjYNwjDZUXoTWpP7VYm3mtsaQckQADN \
    --known-validator 9QxCLckBiJc783jnMvXZubK4wH86Eqqvashtrwvcsgkv \
    --only-known-rpc \
    --log /home/sol/solana-validator.log
    --ledger /mnt/ledger \
    --rpc-port 8899 \
    --dynamic-port-range 8000-8020 \
    --entrypoint entrypoint.testnet.solana.com:8001 \
    --entrypoint entrypoint2.testnet.solana.com:8001 \
    --entrypoint entrypoint3.testnet.solana.com:8001 \
    --expected-genesis-hash 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size
```

Paste the contents of the command, and save the file.

## Verifying Your Validator Is Working

Test that your validator.sh file is running properly.

```
/home/sol/bin/validator.sh
```

In a separate ssh connection, identify your validator pupkey:

```
solana keygen pubkey ~/validator-keypair.json
```

Verify that your validator has made a connection to the gossip protocol. This step verifies that other computers in the network know about your validator.

```
solana gossip | grep <pubkey>
```

Next, Make sure your validator is catching up. See the [FAQ](/docs/FAQ/) for an explanation of catching up:

```
solana catchup <pubkey>
```

If you see a message about trying to connect, your validator is not part of the network yet.

See if your validator is part of the network:

```
solana validators | grep <pubkey>
```

Once you are happy that the validator can start up without errors, the next step is to create a system service to run the validator.sh file automatically.  Stop the currently running validator by doing CTRL+C.


## Create a System Service

Follow these instructions for running the validator as a system service: https://docs.solana.com/running-validator/validator-start#systemd-unit Make sure to implement log rotate as well

```
sudo systemctl enable --now sol
```

Now verify that the validator is running properly by tailing the logs and using the commands mentioned earlier to check gossip and solana validators

```
tail -f /home/sol/solana-validator*.log
```

## Monitoring

`solana-watchtower` is a command you can run on a separate machine to monitor your server. See the [docs](https://docs.solana.com/integrations/exchange#automatic-restarts-and-monitoring)

## Common issues:

* Out of disk space

Make sure your ledger is on drive with at least 1TB of space

* Validator not catching up:

This could be a networking/hardware issue or you may just need to get the latest snapshot from someone
