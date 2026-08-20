// SRC=https://test.nl DST=https://prod.nl EMAIL=.. PASSWORD=.. node scripts/copy-doc.mjs pages <id>
// Relations copied as raw IDs, must already exist in target.
const { SRC, DST, EMAIL, PASSWORD } = process.env
const [collection, id] = process.argv.slice(2)
if (!SRC || !DST || !EMAIL || !PASSWORD || !collection || !id) {
  throw new Error('need SRC, DST, EMAIL, PASSWORD env + <collection> <id> args')
}

const login = async (url) => {
  const res = await fetch(`${url}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`login ${url}: ${res.status} ${await res.text()}`)
  return (await res.json()).token
}

const [srcToken, dstToken] = await Promise.all([login(SRC), login(DST)])

const res = await fetch(`${SRC}/api/${collection}/${id}?depth=0&draft=true`, {
  headers: { Authorization: `JWT ${srcToken}` },
})
if (!res.ok) throw new Error(`fetch: ${res.status} ${await res.text()}`)
const doc = await res.json()

for (const k of ['id', 'createdAt', 'updatedAt', '_status']) delete doc[k]

const created = await fetch(`${DST}/api/${collection}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `JWT ${dstToken}` },
  body: JSON.stringify(doc),
})
if (!created.ok) throw new Error(`create: ${created.status} ${await created.text()}`)
console.log(`created ${collection}/${(await created.json()).doc.id} on ${DST}`)
