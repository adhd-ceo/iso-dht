# iso-dht

An isolated `@hyperswarm/dht` bootstrap node and persistent peer for your private dht

# Install
`npm i --save iso-dht`

# Usage
```js
import IsoDHT from 'iso-dht'
const isodht = new IsoDHT('my.host.or.ip', { ports = { boot: 49737, peer: 49736 } })
await isodht.ready() // creates nodes

console.log(isodht.bootstrap) // get bootstrap info

const [boot, peer] = isodht.nodes // get bootstrap node and persistent peer

await isodht.close() // destroy both nodes

console.log(isodht.bootstrap) // []
console.log(idosht.nodes) // []
```

# API

### `const isodht = new IsoDHT(host, [options])`

`host` should be the permanent ip address of the bootstrap node`

Options includes:

```
{
  port: {
    boot: Number, // port bootstrap node listens on, default = 49737
    peer: Number, // port persistent peer listens on, default = 49736
  }
}
```

### `isodht.ready()`

### `isodht.close([options])`

Options are passed through to `@hyperswarm/dht`'s' `await dht.destroy([options])` method

### `[{ host: String, port: Number }] = isodht.bootstrap`

### `[DHT] = isodht.nodes`

# CLI

## Install
`npm i -g iso-dht`

## Usage
`iso-dht --host 1.1.11.111 --boot-port 49737 --peer-port 49736`

## API
`iso-dht --host <host> --boot-port <port> --peer-port <port>`