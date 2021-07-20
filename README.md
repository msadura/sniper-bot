## Ultimate sniping bot

**How to use**

- [] `yarn install`
- [] create `.env` file with variables:

```
MNEMONIC=ten sniper odmieni twoje marne zycie i staniesz sie bogata swinia gg
USE_CHAIN=MATIC | BSC
USE_SWAP=SUSHI | DFYN | PANCAKE
USE_API_SERVER=Whether to start or noto http api server
SNIPE_TOKEN_NAME=Name of one of tokens from addresses to snipe

MAINNET_WEBSOCKET_MATIC=MATIC WSS Address
MAINNET_HTTP_MATIC=MATIC Http API Address

MAINNET_WEBSOCKET_BSC=BSC WSS Address
MAINNET_HTTP_BSC=BSC Http API Address

RECIPIENT_ADDRESS=Address of recipient wallet
```


**Run Server**
- [] `npm start` - production run, no inspect, no watch
- [] `npm dev` - dev run - with inspect and watch files
- [] `npm dev-no-watch` - dev run - with inspect but no watch files

**Api server**
Bot will run in console showing new pairs added to pancake. WHen env variable `USE_API_SERVER` is set to true You can run `curl localhost:3002/snipe` to trigger your snipe.

To configure your snipes check `index.js` and look for `snipe` calls.