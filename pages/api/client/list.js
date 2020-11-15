const db = require('../../../lib/db')
const escape = require('sql-template-strings')

export default async (req, res) => {
    let page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    if (page < 1) page = 1
    const items = await db.query(escape`
      SELECT *
      FROM client
      ORDER BY client_id
      LIMIT ${(page - 1) * limit}, ${limit}
    `)
    const count = await db.query(escape`
      SELECT COUNT(*)
      AS clientsCount
      FROM client
    `)
    const { clientsCount } = count[0]
    const total_items = Math.ceil(clientsCount / limit)
    res.status(200).json({ items, total_items, page })
}