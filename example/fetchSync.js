var Mam = require('../lib/mam.node.js')
var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: `http://p103.iotaledger.net:14700/` })

// Init State
let root = ''

// Initialise MAM State
var mamState = Mam.init(iota)

// Publish to tangle
const publish = async packet => {
  var message = Mam.create(mamState, packet)
  mamState = message.state
  await Mam.attach(message.payload, message.root)
  return message.root
}

const execute = async () => {
  // Publish and save root.
  root = await publish('POTATOONE')
  // Publish but not save root
  await publish('POTATOTWO')

  ///////////////////////////////////
  // Fetch the messages syncronously
  var resp = await Mam.fetch(root)
  console.log(resp)
}

execute()
