const axios = require('axios')
const crypto = require('crypto')
const postsServices = require('../service/postsServices')

const generateText = () => {
    return crypto.randomBytes(20).toString('hex')    
}

const request = function (url, method, data) {
    return axios({ url, method, data })
}

test('Deve retornar os posts', async () => {
    const post1 = await postsServices.savePost({ title: generateText(), content: generateText() })
    const post2 = await postsServices.savePost({ title: generateText(), content: generateText() })
    const post3 = await postsServices.savePost({ title: generateText(), content: generateText() })

    const response = await request('http://localhost:3000/posts', 'get')

    const posts = response.data

    expect(posts).toHaveLength(3)

    await postsServices.deletePost(post1.id)
    await postsServices.deletePost(post2.id)
    await postsServices.deletePost(post3.id)
})

test('Deve criar os posts', async () => {
    const data = { title: generateText(), content: generateText()}

    const response = await request('http://localhost:3000/posts', 'post', data)

    const post = response.data

    expect(post.title).toBe(data.title)
    expect(post.content).toBe(data.content)

    await postsServices.deletePost(post.id)
})

test('Deve atualizar o post', async () => {
    const post = await postsServices.savePost({ title: generateText(), content: generateText() })

    post.title = generateText()
    post.content = generateText()

    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)

    const updatedPost = await postsServices.getPost(post.id)

    expect(updatedPost.title).toBe(post.title)
    expect(updatedPost.content).toBe(post.content)

    await postsServices.deletePost(post.id)
})

test('Deve apagar o post', async () => {
    const post = await postsServices.savePost({ title: generateText(), content: generateText() })

    const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete')

    const posts = await postsServices.getPosts()

    expect(posts).toHaveLength(0)
})