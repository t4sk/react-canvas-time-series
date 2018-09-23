const assert = require('assert')
const flatbuffers = require('flatbuffers').flatbuffers
const IbPacket = require('./packet_generated').IbPacket

function random(min, max) {
  return Math.random() * (max - min) + min
}

function randomInt(min, max) {
  return Math.floor(random(min, max))
}

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

function main() {
  const now = Date.now() / 1000

  const buf = buildPacket({
    time: now,
    payload: {
      symb: "HUA",
      datetime: "09:34:03-04",
      volume: 1000,
      open: 100,
      high: 200,
      low: 50,
      close: 150,
      volume: 1000,
      wap: 100,
      count: 10,
    }
  })

  // Read
  const pkt = IbPacket.Packet.getRootAsPacket(buf)

  assert.equal(pkt.type(), IbPacket.Type.Tick)
  assert.equal(pkt.time().low, 0)
  assert.equal(pkt.time().high, Math.floor(now))
  assert.equal(pkt.payloadType(), IbPacket.Data.Tick)
  const tick = new IbPacket.Tick()
  assert.equal(pkt.payload(tick).symb(), "HUA")
  assert.equal(pkt.payload(tick).datetime(), "09:34:03-04")
  assert.equal(pkt.payload(tick).open(), 100)
  assert.equal(pkt.payload(tick).high(), 200)
  assert.equal(pkt.payload(tick).low(), 50)
  assert.equal(pkt.payload(tick).close(), 150)
  assert.equal(pkt.payload(tick).volume().low, 0)
  assert.equal(pkt.payload(tick).volume().high, 1000)
  assert.equal(pkt.payload(tick).wap(), 100)
  assert.equal(pkt.payload(tick).count(), 10)

  console.log('The FlatBuffer was successfully created and verified!')
}

main()
