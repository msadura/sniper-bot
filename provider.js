const ethers = require('ethers');
const {
  MAINNET_WEBSOCKET,
  MAINNET_API,
  MAINNET_PASS,
  MAINNET_USER,
  MAINNET_API_PUBLIC
} = require('./constants');

let wsProvider = null;
let apiProvider = null;
let apiPublicProvider = null;
let retries = 0;

const connectProvider = async onConnect => {
  try {
    if (MAINNET_API && !apiProvider) {
      let apiConnectInfo = MAINNET_API;

      if (MAINNET_PASS && MAINNET_USER) {
        apiConnectInfo = {
          url: MAINNET_API,
          user: MAINNET_USER,
          password: MAINNET_PASS
        };
      }

      apiProvider = new ethers.providers.StaticJsonRpcProvider(apiConnectInfo);
      await apiProvider.ready;
      console.log('🔥 Http provider info:', apiConnectInfo);

      if (MAINNET_API_PUBLIC) {
        apiPublicProvider = new ethers.providers.StaticJsonRpcProvider(MAINNET_API_PUBLIC);
        console.log('🔥 Public http provider info:', MAINNET_API_PUBLIC);
        await apiPublicProvider.ready;
      }
    }

    wsProvider = new ethers.providers.WebSocketProvider(MAINNET_WEBSOCKET);
    console.log('🔥 Ws provider info:', MAINNET_WEBSOCKET);
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
    console.log('🔥', 'Sockets disconnected, reconnecting...');

    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
    }

    if (pingTimeout) {
      clearTimeout(pingTimeout);
    }

    wsProvider = null;
    onDisconnect && onDisconnect(err);
    connectProvider(onConnect);
  });

  wsProvider._websocket.on('pong', () => {
    if (pingTimeout) {
      clearInterval(pingTimeout);
    }
  });
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

module.exports = { getProvider, connectProvider };
