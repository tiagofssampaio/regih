const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    if (page < 1) page = 1
    const clients = await db.query(escape`
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
    const pageCount = Math.ceil(clientsCount / limit)
    res.status(200).json({ clients, pageCount, page })
}