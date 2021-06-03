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

    try {
        const newPost = await postsServices.savePost(post)
        resp.status(201).json(newPost)
    } catch (error) {
        resp.status(409).send(error.message)
    }
})

router.put('/posts/:id', async (req, resp) => {
    const post = req.body
    const id = req.params.id

    try {
        await postsServices.updatePost(id, post)
        resp.status(204).end()
    } catch(error) {
        resp.status(404).send(error.message)
    }
})

router.delete('/posts/:id', async (req, resp) => {
    await postsServices.deletePost(req.params.id)

    resp.status(204).end()
})

module.exports = router