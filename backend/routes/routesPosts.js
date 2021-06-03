const express = require('express')
const router = express.Router()
const postsServices = require('../service/postsServices')

router.get('/posts', async (req, resp) => {
    const posts = await postsServices.getPosts()

    resp.json(posts)
})

router.get('/posts/:id', async (req, resp) => {
    const post = await postsServices.getPost(req.params.id)

    resp.json(post)
})

router.post('/posts', async (req, resp) => {
    const post = req.body

    const newPost = await postsServices.savePost(post)

    resp.json(newPost)
})

router.put('/posts/:id', async (req, resp) => {
    const post = req.body
    const id = req.params.id

    await postsServices.updatePost(id, post)

    resp.end()
})

router.delete('/posts/:id', async (req, resp) => {
    await postsServices.deletePost(req.params.id)

    resp.end()
})

module.exports = router