const postsData = require('../data/postsData')

exports.getPosts = function() {
    return postsData.getPosts()
}

exports.getPost = function(postId) {
    return postsData.getPost(postId)
}

exports.savePost = function(post) {
    return postsData.savePost(post)
}

exports.updatePost = function(id, post) {
    return postsData.updatePost(id, post)
}

exports.deletePost = function(postId) {
    return postsData.deletePost(postId)
}