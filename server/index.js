const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const appRoute = require('./src/routes')
const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use('/api', appRoute)

mongoose.connect('mongodb://127.0.0.1:27017/todoke')
    .then(() => { console.log('connect success') })
    .catch(() => {
        console.log('connect failed')
    })

app.listen(5000, () => {
    console.log('Server is running on PORT 5000')
})