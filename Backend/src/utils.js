const db = require('../db/db')

exports.updateField = function updateField(id, path, updateStr) {
    const re = new RegExp("\/([^\/]+)\/")
    const field = path.match(re)[1]
 
    if (!field) return

    for (let i = 0; i < db.products.length; i++) {
        if (db.products[i].id === id) {
          
            db.products[i][`${field}`] = updateStr
            return db.products[i]
        }
    }

    return 
}