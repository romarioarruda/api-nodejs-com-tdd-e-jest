const axios = require('axios')
const crypto = require('crypto')

const generateText = () => {
    return crypto.randomBytes(20).toString('hex')    
}

const request = function (url, method, data) {
    return axios({ url, method, data, validateStatus: false })
}

module.exports = {
    generateText,
    request
}