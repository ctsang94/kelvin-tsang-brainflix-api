import express from "express"
import 'dotenv/config'
import cors from 'cors'
import videosRoute from './routes/videos.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/videos', videosRoute)
app.use(express.static('public'))

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})