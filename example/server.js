const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
}) // allows http get request which will return Hello World

app.get("/goodbye", (req, res) => { // REQuest and RESponse
    res.send("<h1>Goodbye World!</h1>")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} and http://localhost:${port}/goodbye`)
})
