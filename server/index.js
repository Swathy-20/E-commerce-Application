import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js'
import cookieParser from 'cookie-parser'
const app = express()

const PORT = 3006

connectDB()

app.use(express.json())
app.use(cookieParser())
app.get('/',(req,res) => {
    res.send('Hello World')
})


app.use("/api",apiRouter)


app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`)
})