const assert = require('assert')
const flatbuffers = require('flatbuffers').flatbuffers
const IbPacket = require('./packet_generated').IbPacket

// Tick {
//   symb: string;
//   datetime: string;
//   open: double;
//   high: double;
//   low: double;
//   close: double;
//   volume: ulong;
//   wap: double;
//   count: uint;
// }

function buildPayload(builder, args) {
  let {
    symb,
    datetime,
    open,
    high,
    low,
    close,
    volume,
    wap,
    count
  } = args

  symb = builder.createString(symb)
  datetime = builder.createString(datetime)
  volume = builder.createLong(0, volume)

  IbPacket.Tick.startTick(builder)
  IbPacket.Tick.addSymb(builder, symb)
  IbPacket.Tick.addDatetime(builder, datetime)
  IbPacket.Tick.addOpen(builder, open)
  IbPacket.Tick.addHigh(builder, high)
  IbPacket.Tick.addLow(builder, low)
  IbPacket.Tick.addClose(builder, close)
  IbPacket.Tick.addVolume(builder, volume)
  IbPacket.Tick.addWap(builder, wap)
  IbPacket.Tick.addCount(builder, count)

  return IbPacket.Tick.endTick(builder)
}

// Packet {
//   type: Tick
//   time: long
//   payload: Tick
// }
//

function buildPacket(args = {}) {
  let {
    time,
    payload,
  } = args

  const builder = new flatbuffers.Builder(0)

  payload = buildPayload(builder, payload)
  time = builder.createLong(0, time)

  IbPacket.Packet.startPacket(builder)
  IbPacket.Packet.addType(builder, IbPacket.Type.Tick)
  IbPacket.Packet.addTime(builder, time)
  IbPacket.Packet.addPayloadType(builder, IbPacket.Data.Tick);
  IbPacket.Packet.addPayload(builder, payload)
  const packet = IbPacket.Packet.endPacket(builder)

  builder.finish(packet)

  return builder.dataBuffer()
}

function random(min, max) {
  return Math.random() * (max - min) + min
}

function randomInt(min, max) {
  return Math.floor(random(min, max))
}

const SYMBOLS = [
  "AAA",
  "BBB",
  "CCC",
  "DDD",
  "EEE",
  "FFF",
  "GGG",
  "HHH",
]

function randomSymbol() {
  return SYMBOLS[randomInt(0, SYMBOLS.length - 1)]
}

function generateRandomPacket() {
  const now = new Date()

  const low = random(0, 1000)
  const high = random(low, low + 1000)
  const open = random(low, high)
  const close = random(low, high)

  const args = {
    time: Math.round(now.valueOf() / 1000),
    payload: {
      symb: randomSymbol(),
      datetime: now.toString().substring(16, 24),
      open,
      high,
      low,
      close,
      volume: randomInt(100, 1000),
      wap: randomInt(0, 100),
      count: randomInt(0, 100),
    }
  }

  return buildPacket(args)
}

module.exports = {
  generateRandomPacket,
  buildPacket,
}
