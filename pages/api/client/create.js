const db = require('../../../lib/db')
const escape = require('sql-template-strings')

export default async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(404).end()
    }

    const client = await db.query(escape`
      INSERT INTO client
      (name, vat_id, rate)
      VALUES
      ('${req.query.name}', '${req.query.vat_id}', ${req.query.rate})
    `)


    res.status(200).json({ method: req.method})
}