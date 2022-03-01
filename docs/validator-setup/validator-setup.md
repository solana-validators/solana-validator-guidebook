---
sidebar_position: 0
---

# Validator Setup

1. Install the solana cli on your local (secure) computer if it is not already installed: [install solana cli](https://docs.solana.com/cli/install-solana-cli-tools)

2. On your local computer, Create the 3 keypairs that you will need to run your validator ([docs for reference](https://docs.solana.com/running-validator/validator-start#generate-identity)):

```
solana-keygen new -o validator-keypair.json
solana-keygen new -o vote-account-keypair.json
solana-keygen new -o authorized-withdrawer-keypair.json
```

__IMPORTANT__ the authroized-withdrawer-keypair.json should be stored in a secure place like a hardware wallet or a password protection app. It should not be stored on the validator. See the [FAQ](/docs/FAQ/) for more details.




3. Use the solana network to create a vote account.  This should be done on your local machine (not on your validator):

```
solana create-vote-account ~/vote-account-keypair.json ~/validator-keypair.json ~/authorized-withdrawer-keypair.json
```

4. Make sure your authorized-withdrawer-keypair is stored in a safe place, then delete it from your local machine. __Important__: if you lose your withdrawer key pair, you will not be able to withdraw tokens from the vote account and you will lose access to it.

5. Connect to your remote server. This is specific to your server but will look something like this:

```
ssh root@my.server.hostname
```

6. Create a new ubuntu user for running the validator:

```
sudo adduser sol
```

7. On your ubuntu validator server make sure that you have at least 2TB of disk space mounted. If you have a drive but it is not mounted/formatted, you’ll have to follow the steps [here](https://phoenixnap.com/kb/linux-format-disk):


8. Make sure you have the latest and greatest package versions on your server

```
sudo apt update
sudo apt install
```

9. Run the solana-sys-turner:

```

```

10. Switch to the sol user

```
su sol
```

10. Securely copy the validator-keypair.json file and the vote-account-keypair.json file to the validator server. Do not copy the authorized-widthdrawer-keypair to the server

11. In your sol home directory (`/home/sol/`), create a folder called bin. Inside that folder create a file called validator.sh

```
mkdir -p /home/sol/bin
touch /home/sol/bin/validator.sh
```

12. Paste [this command](https://docs.solana.com/clusters#testnet) in a validator.sh file.

```
nano /home/sol/bin/validator.sh
```

13. Follow these instructions for running the validator as a system service: https://docs.solana.com/running-validator/validator-start#systemd-unit Make sure to implement log rotate as well

14. Test that your validator.sh file is running properly before you start the system service

```
/home/sol/bin/validator.sh
```


15. In a separate ssh connection, identify your identity pupkey:

```
solana keygen pubkey ~/validator-keypair.json
```

14. Verify that your validator is running using your pubkey by searching through gossip output:

```
solana gossip | grep <pubkey>
```

15. Make sure your validator is catching up. See the [FAQ](/docs/FAQ/) for an explanation of catching up:

```
solana catchup <pubkey>
```

16. If you see a message about trying to connect, your validator is not part of the network yet.

See if your validator is part of the network:

```
solana validators | grep `solana keygen pubkey ~/validator-keypair.json`
```

17. Once you have verified that the validator script is running properly, in your first terminal window, stop the script using control + C

18. Start the validator as a system service:

```
sudo systemctl enable --now sol
```

19. Watch the logs to verify the validator is running properly:

```
tail -f /home/sol/solana-validator*.log
```

20.  Setup monitoring:

`solana-watchtower` is a command you can run on a separate machine to monitor your server. See the [docs](https://docs.solana.com/integrations/exchange#automatic-restarts-and-monitoring)

21. Common issues:

* Out of disk space

Make sure your ledger is on drive with at least 1TB of space

* Validator not catching up:

This could be a networking/hardware issue or you may just need to get the latest snapshot from someone
