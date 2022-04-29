---
sidebar_position: 1
---

# Validator Setup

This is a guide for getting your validator setup on the Solana testnet cluster for the first time.  Testnet is a solana cluster that is used for performance testing of the software before the software is used on mainnet.  Since testnet is stress tested daily, it is a good cluster practice your validator operations with before you start a mainnet validator.

Once you have a working validator on testnet, you will want to learn about [operational best practices](/validator-setup/operational-best-practices) in the next section. Although the guide is specific to testnet, it can be adapted to mainnet or devnet as well.  Refer to the [clusters](https://docs.solana.com/clusters) section of the solana docs to see example commands for each cluster.

Now let's get started.

## Open The Terminal Program

Locate the terminal program on your local computer.  On mac, you can search for the word _terminal_ in spotlight. On Ubuntu, you can type CTRL + Alt + T. On windows, you will have to open the command prompt as an Administrator.

## Install The Solana CLI Locally

To create your validator vote account, you need to install the solana command line interface on your local computer.  Follow [Use Solana's Install Tool](https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool) section from the solana docs to install the cli.  You can return to this document once you are able to run the following command and get an answer on your terminal:

```
solana --version
```

You should see an output that looks similar to this (note your version number may be higher):

```
solana-cli 1.10.11 (src:f61b4f95; feat:1122441720)
```

Once you have successfully installed the cli, the next step is to change your config so that it is making requests to the testnet cluster:

```
solana config set --url https://api.testnet.solana.com
```

To verify that your config has change run:

```
solana config get
```

You should see a line that says, `RPC URL: https://api.testnet.solana.com`

## Create Keys

On your local computer, Create the 3 keypairs that you will need to run your validator ([docs for reference](https://docs.solana.com/running-validator/validator-start#generate-identity)):

```
solana-keygen new -o validator-keypair.json
```

```
solana-keygen new -o vote-account-keypair.json
```

```
solana-keygen new -o authorized-withdrawer-keypair.json
```

__IMPORTANT__ the authroized-withdrawer-keypair.json should be stored in a secure place like a hardware wallet or a password protection app. It should not be stored on the validator. See the [FAQ](/FAQ/) for more details.

## Create A Vote Account

Before you can create your vote account, you need to configure the solana command line tool a bit more.


The below command sets the default kepair that the solana cli uses to the `validator-keypair.json` file that you just created in the terminal:

```
solana config set `pwd`/validator-keypair.json
```

Now verify your account balance of 0:

```
solana balance
```

Next, you need to deposit some sol into that keypair account in order create a transaction (in this case, making your vote account):

```
solana airdrop 1
```

The above command does not work on mainnet so you will have to figure out how to transfer sol into this keypair account if you are setting up a mainnet validator.

Now, use the solana network to create a vote account.  This should be done on your local machine (not on your validator):

```
solana create-vote-account ./vote-account-keypair.json ./validator-keypair.json ./authorized-withdrawer-keypair.json
```

## Save the Withdrawer Keypair Securely

Make sure your `authorized-withdrawer-keypair` is stored in a safe place, then delete it from your local machine.

__IMPORTANT__: If you lose your withdrawer key pair, you will not be able to withdraw tokens from the vote account and you will lose access to it.  Make sure to store the `authorized-withdrawer-keypair` securely before you move on.

## SSH To Your Validator

Connect to your remote server. This is specific to your server but will look something like this:

```
ssh root@<server.hostname>
```

You will have to check with your server provider to get the correct user account and hostname that you will ssh into.

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

If you have a drive but it is not mounted/formatted, you will have to setup the partition and mount the drive.

To see the hard disk devices that you have available, use the list block devices command:

```
lsblk -f
```

You may see some devices in the list that have a name but do not have a UUID. Any device without a UUID is unformatted.

### Drive Formatting: Ledger

Assuming you have an nvme drive, that is not formatted, you will have to format the drive and then mount it. For example, if your computer has a device located at `/dev/nvme0n1`, then you can format the drive with the command:

```
sudo mkfs -t ext4 /dev/nvme0n1
```

For your computer, the device name and location may be different.

Next, check that you now have a UUID for that device:

```
lsblk -f
```

In the forth column, next to your device name, you should see a string of letters and numbers that look like this: `6abd1aa5-8422-4b18-8058-11f821fd3967`. That is the UUID for the device.

### Mounting Your Drive: Ledger

So far, we have created a formatted drive, but you do not have access to it until you mount it. Make a directory for mounting your drive:

```
sudo mkdir -p /mnt/ledger
```

Next, change the ownership of the directory to your sol user:

```
sudo chown -R sol:sol /mnt/ledger
```

Now you can mount the drive:

```
sudo mount /dev/nvme01 /mnt/ledger
```

### Formatting And Mounting Drive: AccountsDB

You will also want to mount the accounts db on a separate hard drive.  The process will be similar to the ledger example above.

Assuming you have device at `/dev/nvme1n1`, Format the device and verify it exists:

```
sudo mkfs -t ext4 /dev/nvme0n1
```

Then verify the UUID for the device exists:

```
lsblk -f
```

Create directory for mounting:

```
sudo mkdir -p /mnt/accounts
```

Change the ownership of that directory:

```
sudo chown -R sol:sol /mnt/accounts
```

And lastly, mount the drive:

```
sudo mount /dev/nvme01n1 /mnt/accounts
```

## System Tuning

In order for your validator to run properly, you will need to tune the system. (If you skip this step, you will likely get an out of memory error). The solana docs have an advanced discussion of manual tuning options [here](https://docs.solana.com/running-validator/validator-start#system-tuning).  To get started, the automated `solana-sys-tuner` will work well for us. Run the following:

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
scp validator-keypair.json sol@<server.hostname>:
scp vote-account-keypair.json sol@<server.hostname>:
```

## Create A Validator Startup Script

In your sol home directory (`/home/sol/`), create a folder called bin. Inside that folder create a file called validator.sh

```
mkdir -p /home/sol/bin
touch /home/sol/bin/validator.sh
chmod +x /home/sol/bin/validator.sh
```
Next, open the `validator.sh` file for editing

```
nano /home/sol/bin/validator.sh
```

Copy and paste the following into `validator.sh`:

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

Paste the contents of the command, and save the file.  Refer to `solana-validator --help` for more information on what each flag is doing in this script.  For a discussion of operating best practices, see the [next section](/validator-setup/operational-best-practices).

## Verifying Your Validator Is Working

Test that your validator.sh file is running properly by executing the validator.sh script.

```
/home/sol/bin/validator.sh
```

The script should execute the `solana-validator` process.  In a new terminal window, shh to your server, then verify that the process is running:

```
ps aux | grep solana-validator
```

You should see a line in the output that includes `solana-validator` with all of the flags that were added to your `validator.sh` script.

Next, we need to look at the logs to make sure everything is operating properly.

### Tailing The Logs

As a spot check, you will want to make sure your validator is producing reasonable log output (warning, there will be a lot of log output).  In a new terminal window, ssh to your validator machine, switch users to the `sol` user and tail the logs:

```
su - sol
tail -f solana-validator.log
```

The tail command will continue to display the output of a file as the file changes.  You should see a continuous stream of log output as your validator runs. Keep an eye out for any lines that say _ERROR_.  Assuming you do not see any error messages, exit out of the command.

### Gossip Protocol

Gossip is a protocol used in the solana network to pass non critical messages between validators. To verify that your validator is running properly, you should make sure that the validator has registered itself with the gossip network.

In a new terminal window, connect to your server via ssh. Identify your validator pupkey:

```
solana keygen pubkey ~/validator-keypair.json
```

The command `solana gossip` lists all validators that have registered with the protocol. To check that the newly setup validator is in gossip, we will grep for our pubkey in the output:

```
solana gossip | grep <pubkey>
```

After running the command, you should see a single line that looks like this:

```
172.16.254.1  | 3ZtxSmWJnDVxws31MAkLXnNzNPB8eTYzsyJWMJULVYuz | 8000   | 8003  | none                  | 1.10.9  | 1122441720
```

If you do not see any output after greping the output of gossip, your validator may be having startup problems. If that is the case, start debugging by looking through the validator log output.

### Solana Validators

After you have verified that your validator is in gossip, you can verify that your validator has joined the network using the `solana validators` command.  The command lists all validators in the network, but like before, we can grep the output for the validator we care about:

```
solana validators | grep <pubkey>
```

You should see a line of output that looks like this:

```
  3ZtxSmWJnDVxws31MAkLXnNzNPB8eTYzsyJWMJULVYuz  FBGaLZsV9xMamgc9aFg6aAer5BxiGiunamCVXer26xAQ   10%  130100678 ( -7)  130100632 (-10)   7.62%   293731   1.10.9   12479.55 SOL (1.11%)
```


### Solana Catchup

The solana catchup command is a useful tool for seeing how quickly your validator is processing blocks.  The solana network has the capability to produce many transactions per second.  Since your validator is new to the network, it has to ask another validator (listed as a --known-validator in your startup script) for a recent snapshot of the ledger.  By the time you receive the snapshot, you may already be behind the network.  Many transactions may have been processed and finalized in that time. In order for your validator to participate in consensus, it must _catchup_ to the rest of the network by asking for the more recent transactions that it does not have.

The `solana catchup` command is a tool that tells you how far behind the network your validator is and how quickly you are catching up.

```
solana catchup <pubkey>
```

If you see a message about trying to connect, your validator may not be part of the network yet.  Make sure to check the logs and double check `solana gossip` and `solana validators` to make sure your validator is running properly.

Once you are happy that the validator can start up without errors, the next step is to create a system service to run the validator.sh file automatically.  Stop the currently running validator by doing CTRL+C in the window where `validator.sh` is running.


## Create a System Service

Follow these instructions for running the validator as a system service: https://docs.solana.com/running-validator/validator-start#systemd-unit Make sure to implement log rotate as well. Once you have the system service configured, start your validator using the newly configured service:

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
