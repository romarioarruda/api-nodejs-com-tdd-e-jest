const postsData = require('../data/postsData')

exports.getPosts = function() {
    return postsData.getPosts()
}

exports.getPost = async function(postId) {
    const post = await postsData.getPost(postId)

    if (!post) throw new Error('Post não encontrado!')

    return post
}

exports.savePost = async function(post) {
    const postByTitle = await postsData.getPostByTitle(post.title)

    if (postByTitle) throw new Error('Post já existe com esse titulo!')

    return postsData.savePost(post)
}

exports.updatePost = async function(id, post) {
    await exports.getPost(id)

    return postsData.updatePost(id, post)
}

exports.deletePost = function(postId) {
    return postsData.deletePost(postId)
}