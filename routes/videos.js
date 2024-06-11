import express from 'express'
const router = express.Router()
import fs from 'fs'

router.get('/', (req,res)=>{
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    res.json(videoData)
})

export default router