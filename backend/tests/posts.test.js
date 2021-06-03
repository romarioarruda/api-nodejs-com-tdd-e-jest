const postsServices = require('../service/postsServices')
const { generateText, request } = require('./services')

test('Deve retornar os posts', async () => {
    const post1 = await postsServices.savePost({ title: generateText(), content: generateText() })
    const post2 = await postsServices.savePost({ title: generateText(), content: generateText() })
    const post3 = await postsServices.savePost({ title: generateText(), content: generateText() })

    const response = await request('http://localhost:3000/posts', 'get')

    const posts = response.data

    expect(response.status).toBe(200)
    expect(posts).toHaveLength(3)

    await postsServices.deletePost(post1.id)
    await postsServices.deletePost(post2.id)
    await postsServices.deletePost(post3.id)
})

test('Deve criar os posts', async () => {
    const data = { title: generateText(), content: generateText()}

    const response = await request('http://localhost:3000/posts', 'post', data)

    const post = response.data

    expect(response.status).toBe(201)
    expect(post.title).toBe(data.title)
    expect(post.content).toBe(data.content)

    await postsServices.deletePost(post.id)
})

test('Não deve criar o post', async () => {
    const data = { title: generateText(), content: generateText()}

    const response1 = await request('http://localhost:3000/posts', 'post', data)
    const response2 = await request('http://localhost:3000/posts', 'post', data)

    expect(response2.status).toBe(409)

    const post = response1.data

    await postsServices.deletePost(post.id)
})

test('Deve atualizar o post', async () => {
    const post = await postsServices.savePost({ title: generateText(), content: generateText() })

    post.title = generateText()
    post.content = generateText()

    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)

    const updatedPost = await postsServices.getPost(post.id)

    expect(response.status).toBe(204)
    expect(updatedPost.title).toBe(post.title)
    expect(updatedPost.content).toBe(post.content)

    await postsServices.deletePost(post.id)
})

test('Não deve atualizar o post', async () => {
    const post = { id: 1 }

    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)

    expect(response.status).toBe(404)
})

test('Deve apagar o post', async () => {
    const post = await postsServices.savePost({ title: generateText(), content: generateText() })

    const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete')

    const posts = await postsServices.getPosts()

    expect(response.status).toBe(204)
    expect(posts).toHaveLength(0)
})