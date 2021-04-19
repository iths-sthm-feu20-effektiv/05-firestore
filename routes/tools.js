const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// ** REST API **

// GET /tools
router.get('/', async (req, res) => {
	// console.log('/tools REST API');
	// res.send('/tools REST API')

	const toolsRef = db.collection('tools')
	const snapshot = await toolsRef.get()

	if( snapshot.empty ) {
		res.send([])
		return
	}

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id  // id behövs för POST+PUT+DELETE
		items.push( data )
	})
	res.send(items)
})

// GET /tools/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('tools').doc(id).get()

	if( !docRef.exists ) {
		res.status(404).send('Tool does not exist')
		return
	}

	const data = docRef.data()
	res.send(data)
})

// POST /tools
router.post('/', async (req, res) => {
	// OBS! Måste installera express.json för att detta ska fungera
	const object = req.body

	if( !object || !object.name || !object.price ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('tools').add(object)
	res.send(docRef.id)
})








// PUT /tools/:id
// DELETE /tools/:id


module.exports = router
