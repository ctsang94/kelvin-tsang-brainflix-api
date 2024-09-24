import express from 'express'
const router = express.Router()
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

router.get('/', async (req, res) => {
    try {
        const videoData = JSON.parse(
            await fs.readFileSync('./data/videos.json')
        )

        const extractedData = videoData.map((video) => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        }))
        res.json(extractedData)
    } catch (err) {
        res.status(500).json({ error: 'Error reading video data' })
    }
})

router.get('/:videoId', (req, res) => {
    const { videoId } = req.params
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const foundVideo = videoData.find((video) => video.id === videoId)

    if (!foundVideo) {
        res.sendStatus(204)
        return
    } else {
        res.json(foundVideo)
    }
})

router.post('/', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const { title, description, image } = req.body
    const newVideo = {
        id: uuidv4(),
        title: title,
        channel: 'Kelvin',
        image: image,
        description: description,
        views: '5000',
        likes: '300',
        duration: '4:00',
        video: 'https://unit-3-project-api-0a5620414506.herokuapp.com/stream',
        timestamp: Date.now(),
        comments: [
            {
                id: uuidv4(),
                name: 'Kirk Wade',
                comment: 'I love the song in this video.',
                likes: '10',
                timestamp: Date.now(),
            },
            {
                id: uuidv4(),
                name: 'John Cena',
                comment: 'I love the song in this video.',
                likes: '2000',
                timestamp: Date.now(),
            },
            {
                id: uuidv4(),
                name: 'Jimmy Din',
                comment:
                    'While the concept of mindful living is intriguing, I found it challenging to incorporate into my hectic routine. Perhaps a more realistic approach or practical tips for those with busy schedules would be beneficial. Looking forward to seeing more actionable advice.',
                likes: '15',
                timestamp: Date.now(),
            },
        ],
    }
    videoData.push(newVideo)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
    res.status(201).json({ message: 'Video added successfully' })
})

router.post('/:videoId/comments', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const videoId = req.params.videoId

    const newComments = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        timestamp: Date.now(),
    }

    const video = videoData.find((video) => video.id === videoId)

    if (video) {
        video.comments.push(newComments)
        fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
        res.status(201).json({ message: 'Comment added succesfully' })
    } else {
        res.status(404).json({ message: 'Video not found' })
    }
})

export default router
