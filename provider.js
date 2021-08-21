const ethers = require('ethers');
const {
  MAINNET_WEBSOCKET,
  MAINNET_API,
  MAINNET_PASS,
  MAINNET_USER,
  MAINNET_API_PUBLIC,
  USE_TESTNET,
  TESTNET_WEBSOCKET,
  TESTNET_API
} = require('./constants');

const httpApiUrl = USE_TESTNET ? TESTNET_API : MAINNET_API;
const httpApiPublic = USE_TESTNET ? TESTNET_API : MAINNET_API_PUBLIC;
const wssApiUrl = USE_TESTNET ? TESTNET_WEBSOCKET : MAINNET_WEBSOCKET;

let wsProvider = null;
let apiProvider = null;
let apiPublicProvider = null;
let retries = 0;
let autoReconnect = true;

const connectProvider = async onConnect => {
  try {
    autoReconnect = true;

    if (httpApiUrl && !apiProvider) {
      let apiConnectInfo = httpApiUrl;

      if (MAINNET_PASS && MAINNET_USER && !USE_TESTNET) {
        apiConnectInfo = {
          url: MAINNET_API,
          user: MAINNET_USER,
          password: MAINNET_PASS
        };
      }

      apiProvider = new ethers.providers.StaticJsonRpcProvider(apiConnectInfo);
      await apiProvider.ready;
      console.log('🔥 Http provider info:', apiConnectInfo);

      if (httpApiPublic) {
        apiPublicProvider = new ethers.providers.StaticJsonRpcProvider(httpApiPublic);
        console.log('🔥 Public http provider info:', httpApiPublic);
        await apiPublicProvider.ready;
      }
    }

    wsProvider = new ethers.providers.WebSocketProvider(wssApiUrl);
    console.log('🔥 Ws provider info:', wssApiUrl);
    keepAlive({ onConnect });
    await wsProvider.ready;
    retries = 0;
  } catch (e) {
    console.log('Error while connecting to provider.');
    console.log('🔥', e);

    if (retries < 5) {
      retries += 1;
      console.log('🔥', 'Retrying connecting to provider');
      connectProvider(onConnect);
    }
  }
};

const keepAlive = ({ onDisconnect, onConnect, expectedPongBack = 15000, checkInterval = 7500 }) => {
  let pingTimeout = null;
  let keepAliveInterval = null;

  wsProvider._websocket.on('open', () => {
    console.log('🔥', 'Sockets connected.');
    onConnect && onConnect();

    keepAliveInterval = setInterval(() => {
      wsProvider._websocket.ping();

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      pingTimeout = setTimeout(() => {
        wsProvider._websocket.terminate();
      }, expectedPongBack);
    }, checkInterval);
  });

  wsProvider._websocket.on('close', err => {
    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
    }

    if (pingTimeout) {
      clearTimeout(pingTimeout);
    }

    wsProvider = null;
    onDisconnect && onDisconnect(err);

    if (autoReconnect) {
      console.log('🔥', 'Sockets disconnected, reconnecting...');
      connectProvider(onConnect);
    }
  });

  wsProvider._websocket.on('pong', () => {
    if (pingTimeout) {
      clearInterval(pingTimeout);
    }
  });
};

const disconnectSockets = () => {
  console.log('🔥', 'Manually shutting down sockets.');
  autoReconnect = false;
  try {
    wsProvider._websocket.terminate();
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

const getHttpProvider = () => {
  if (!apiProvider) {
    console.log('🔥', 'Trying to use api provider that is not initialized!');
  }

  return apiProvider;
};

const getPublicHttpProvider = () => {
  if (!apiPublicProvider) {
    console.log('🔥', 'Trying to use public api provider that is not initialized!');
    return getHttpProvider();
  }

  return apiPublicProvider;
};

const getWsProvider = () => {
  if (!wsProvider) {
    console.log('🔥', 'Trying to use wss provider that is not initialized!');
  }

  return wsProvider;
};

const getProvider = (connectionType = 'wss') => {
  if (connectionType === 'public') {
    const apiProvider = getPublicHttpProvider();
    if (apiProvider) {
      return apiProvider;
    }
  }

  if (connectionType === 'http') {
    const apiProvider = getHttpProvider();
    if (apiProvider) {
      return apiProvider;
    }
  }

  return getWsProvider();
};

module.exports = { getProvider, connectProvider, disconnectSockets };
