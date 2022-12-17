#!/usr/bin/env node
import minimist from 'minimist'
import IsoDHT from './index.js'

const argv = minimist(process.argv.slice(2))

const { h, help, host } = argv
const ports = { boot: argv['boot-port'], peer: argv['peer-port'] }

const helpmsg = `
  [description]
  Creates an isolated @hyperswarm/dht node

  [usage]
  iso-dht <options>
  
  [options]
  --host <host>       (required)
  --boot-port <port>  (optional)
  --peer-port <port>  (optional)

  [example]
  iso-dht --host 10.2.7.112 --port-port 49737 --peer-port 49736
`

if (h || help) {
  console.log(helpmsg)
  process.exit(0)
} else if (!host) {
  console.error('Must provide a host: --host <host>')
  console.log(helpmsg)
  process.exit(1)
}

const isodht = new IsoDHT(host, { ports })
await isodht.ready()

process.on('SIGINT', async () => {
  await isodht.close()
  process.exit(0)
})

console.log(`bootstrap: ${JSON.stringify(isodht.bootstrap)}`)