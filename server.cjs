const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

// Serve the static files from the dist directory
app.use('/Portfolio', express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
