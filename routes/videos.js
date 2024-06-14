import express from 'express'
const router = express.Router()
import fs from 'fs'
import { v4 as uuidv4} from 'uuid'

router.get('/', (req,res)=>{
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    
    const extractedData = videoData.map(video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
     }));
    res.json(extractedData)
})

router.get( '/:videoId', (req,res)=>{
    const {videoId} = req.params
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const foundVideo = videoData.find( video => video.id === videoId )
    
    if (!foundVideo) {
        res.sendStatus(204)
        return
    }
    else{
       res.json(foundVideo) 
    }
})

router.post('/', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const { title, channel, image } = req.body;
    const newVideo = { 
        id: uuidv4(),
        title: title,
        channel: channel,
        image: image
    }
    videoData.push(newVideo)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
    res.status(201).json({message: 'Video added successfully'})

} )

router.post('/:videoId/comments', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const videoId = req.params.videoId

    const newComments = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        timestamp: Date.now()
    }

    const video = videoData.find(video => video.id === videoId)

    if (video) {
        video.comments.push(newComments)
        fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
        res.status(201).json({message: 'Comment added succesfully'})
    }else{
        res.status(404).json({message: 'Video not found'})

    }

})  

export default router