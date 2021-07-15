const ethers = require('ethers');
const { MAINNET_WEBSOCKET } = require('./constants');

let provider = null;
let connectingPromise = null;
let connectingPromiseResolve = null;

const connectProvider = async onConnect => {
  if (connectingPromise) {
    return connectingPromise;
  }

  connectingPromise = new Promise(resolve => {
    connectingPromiseResolve = resolve;
  });

  provider = new ethers.providers.WebSocketProvider(MAINNET_WEBSOCKET);
  keepAlive({ onConnect });

  return connectingPromise;
};

const keepAlive = ({ onDisconnect, onConnect, expectedPongBack = 15000, checkInterval = 7500 }) => {
  let pingTimeout = null;
  let keepAliveInterval = null;

  provider._websocket.on('open', () => {
    console.log('🔥', 'Sockets connected.');
    onConnect && onConnect();
    resolveConnection();

    keepAliveInterval = setInterval(() => {
      provider._websocket.ping();

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      pingTimeout = setTimeout(() => {
        provider._websocket.terminate();
      }, expectedPongBack);
    }, checkInterval);
  });

  provider._websocket.on('close', err => {
    console.log('🔥', 'Sockets disconnected, reconnecting...');

    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
    }

    if (pingTimeout) {
      clearTimeout(pingTimeout);
    }

    provider = null;
    onDisconnect && onDisconnect(err);
    connectProvider(onConnect);
  });

  provider._websocket.on('pong', () => {
    if (pingTimeout) {
      clearInterval(pingTimeout);
    }
  });
};

function resolveConnection() {
  if (connectingPromiseResolve) {
    connectingPromiseResolve();
    connectingPromiseResolve = null;
  }

  if (connectingPromise) {
    connectingPromise = null;
  }
}

const getProvider = () => {
  if (!provider) {
    console.log('🔥', 'Trying to use provider that is not connected!');
  }
  return provider;
};

module.exports = { getProvider, connectProvider };
