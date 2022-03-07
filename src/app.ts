import express from 'express';
import YoutubeMusicApi from 'youtube-music-api'
import ytdl from 'ytdl-core';
import cors from 'cors'
const app = express();
const port = process.env.PORT || 8000;
const api = new YoutubeMusicApi();
await api.initalize()

app.use(cors());

app.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query as string
        const result = await api.search(query)
        res.status(200);
        res.json(result)
    } catch (e) {
        res.status(500)
        res.end()
    }
})

app.get('/download/:id', async (req, res) => {
    const url = `https://www.youtube.com/watch?v=${req.params.id}`
    res.header("Content-Disposition", 'attachment;\\  filename="Video.mp4');    
    ytdl(url, {
        filter: 'audioonly'
    }).pipe(res);
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
