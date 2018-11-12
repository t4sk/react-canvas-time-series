const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

function parseLine(line) {
  const [
    id,
    symbol,
    timestamp,
    unixtime,
    field,
    price,
    size,
    canAutoExecute,
  ] = line.split(',')

  return {
    id: parseInt(id, 10),
    symbol,
    timestamp,
    unixtime: parseInt(unixtime, 10),
    field: parseInt(field, 10),
    price: parseFloat(price, 10) || 0,
    size: parseInt(size, 10),
    canAutoExecute: canAutoExecute == 't',
  }
}

function parseCSV(data) {
  return data.toString().split('\n').map(line => parseLine(line))
}

async function readCSV(path) {
  const data = await readFile(path)
  return parseCSV(data)
}

module.exports = {
  readCSV
}
