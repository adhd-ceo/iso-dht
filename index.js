import DHT from '@hyperswarm/dht'
import ReadyResource from 'ready-resource'

class IsoDHT extends ReadyResource {
  host = null
  ports = { boot: 49737, peer: 49736 }
  nodes = []
  bootstrap = []

  constructor (host, opts = {}) {
    super()
    
    const { ports = {} } = opts

    this.host = host
    this.ports.boot = ports.boot ?? this.ports.boot
    this.ports.peer = ports.peer ?? this.ports.peer
  }

  async _open () {
    const { ports, host, bootstrap, nodes } = this
    const boot = DHT.bootstrapper(ports.boot, host)
    await boot.ready()
    bootstrap.push({ host, port: boot.address().port })
    nodes.push(boot)
    const peer = new DHT({ bootstrap, ephemeral: false, port: ports.peer })
    await peer.ready()
    bootstrap.push({ host, port: peer.address().port })
    nodes.push(peer)
  }

  async _close (opts = {}) {
    await Promise.all(this.nodes.map((n) => n.destroy(opts)))
    this.nodes = []
    this.bootstrap = []
  }
}

export default IsoDHT