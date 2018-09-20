const assert = require('assert')
const flatbuffers = require('flatbuffers').flatbuffers
const IbPacket = require('./packet_generated').IbPacket

function main() {
  const builder = new flatbuffers.Builder(0)

  // Packet {
  //   type: Tick
  //   time: long
  //   payload: Tick
  // }
  //
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

  const symb = builder.createString("HUA")
  const datetime = builder.createString("09:34:03-04")
  const volume = builder.createLong(0, 1000)

  IbPacket.Tick.startTick(builder)
  IbPacket.Tick.addSymb(builder, symb)
  IbPacket.Tick.addDatetime(builder, datetime)
  IbPacket.Tick.addOpen(builder, 100)
  IbPacket.Tick.addHigh(builder, 200)
  IbPacket.Tick.addLow(builder, 50)
  IbPacket.Tick.addClose(builder, 150)
  IbPacket.Tick.addVolume(builder, volume)
  IbPacket.Tick.addWap(builder, 100)
  IbPacket.Tick.addCount(builder, 10)
  const payload = IbPacket.Tick.endTick(builder)

  const now = builder.createLong(0, Date.now() / 1000)

  IbPacket.Packet.startPacket(builder)
  IbPacket.Packet.addType(builder, IbPacket.Type.Tick)
  IbPacket.Packet.addTime(builder, now)
  IbPacket.Packet.addPayloadType(builder, IbPacket.Data.Tick);
  IbPacket.Packet.addPayload(builder, payload)
  const packet = IbPacket.Packet.endPacket(builder)

  builder.finish(packet)

  // Read
  const buf = builder.dataBuffer()

  const pkt = IbPacket.Packet.getRootAsPacket(buf)

  assert.equal(pkt.type(), IbPacket.Type.Tick)
  assert.equal(pkt.time().low, now.low)
  assert.equal(pkt.time().high, now.high)
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
