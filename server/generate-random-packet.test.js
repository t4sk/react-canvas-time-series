const flatbuffers = require('flatbuffers').flatbuffers
const IbPacket = require('./packet_generated').IbPacket
const { buildPacket } = require('./generate-random-packet')

test("packet", () => {
  const args = {
    time: Math.round(Date.now() / 1000),
    payload: {
      symb: "HUA",
      datetime: "09:34:03-04",
      open: 100,
      high: 200,
      low: 50,
      close: 150,
      volume: 1000,
      wap: 100,
      count: 10,
    }
  }

  const buf = buildPacket(args)
  const pkt = IbPacket.Packet.getRootAsPacket(buf)

  expect(pkt.type()).toEqual(IbPacket.Type.Tick)
  expect(pkt.time().low).toEqual(0)
  expect(pkt.time().high).toEqual(args.time)
  expect(pkt.payloadType()).toEqual(IbPacket.Data.Tick)
  const tick = new IbPacket.Tick()
  expect(pkt.payload(tick).symb()).toEqual(args.payload.symb)
  expect(pkt.payload(tick).datetime()).toEqual(args.payload.datetime)
  expect(pkt.payload(tick).open()).toEqual(args.payload.open)
  expect(pkt.payload(tick).high()).toEqual(args.payload.high)
  expect(pkt.payload(tick).low()).toEqual(args.payload.low)
  expect(pkt.payload(tick).close()).toEqual(args.payload.close)
  expect(pkt.payload(tick).volume().low).toEqual(0)
  expect(pkt.payload(tick).volume().high).toEqual(args.payload.volume)
  expect(pkt.payload(tick).wap()).toEqual(args.payload.wap)
  expect(pkt.payload(tick).count()).toEqual(args.payload.count)
})
