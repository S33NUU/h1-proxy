export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  const path = req.query.path || '/v1/me/programs?page%5Bsize%5D=100'
  const auth = req.headers['authorization'] || req.query.auth || ''

  if (!auth) {
    res.status(400).json({ error: 'No auth header received' })
    return
  }

  const response = await fetch(`https://api.hackerone.com${path}`, {
    headers: {
      'Authorization': auth,
      'Accept': 'application/json'
    }
  })
  const data = await response.json()
  res.status(response.status).json(data)
}
