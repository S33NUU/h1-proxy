export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  const path = req.query.path || '/v1/me/programs?page%5Bsize%5D=100'
  const response = await fetch(`https://api.hackerone.com${path}`, {
    headers: {
      'Authorization': req.headers['authorization'],
      'Accept': 'application/json'
    }
  })
  const data = await response.json()
  res.status(response.status).json(data)
}
