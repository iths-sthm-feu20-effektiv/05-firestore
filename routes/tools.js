const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// REST API
router.get('/', (req, res) => {
	console.log('/tools REST API');
	res.send('/tools REST API')
})


module.exports = router
