const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const tools = require('./routes/tools.js')

// Heroku uses process.env.PORT
const PORT = process.env.PORT || 1339
const staticFolder = path.join(__dirname, 'static')


// Middleware
// Logger - skriv ut info om inkommande request
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )   // Cross-Origin Resource Sharing
app.use( express.static(staticFolder) )



// Routes

// REST API for /tools
app.use('/tools', tools)



// Starta servern
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
