const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
})

app.use(express.static("public")) 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} and http://localhost:${port}/goodbye`)
})
