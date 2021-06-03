const express = require('express')
const router = express.Router()
const postsServices = require('../service/postsServices')

router.get('/posts', async (req, resp, next) => {
    try {
        const posts = await postsServices.getPosts()
        resp.json(posts)
    } catch (error) {
        next(error)
    }
})

router.get('/posts/:id', async (req, resp, next) => {
    try {
        const post = await postsServices.getPost(req.params.id)
        resp.json(post)
    } catch (error) {
        next(error)
    }
})

router.post('/posts', async (req, resp, next) => {
    const post = req.body

    try {
        const newPost = await postsServices.savePost(post)
        resp.status(201).json(newPost)
    } catch (error) {
        next(error)
    }
})

router.put('/posts/:id', async (req, resp, next) => {
    const post = req.body
    const id = req.params.id

    try {
        await postsServices.updatePost(id, post)
        resp.status(204).end()
    } catch(error) {
        next(error)
    }
})

router.delete('/posts/:id', async (req, resp, next) => {
    try {
        await postsServices.deletePost(req.params.id)
        resp.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = router