const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')

router.get('/uploads*', (req, res, next) => {
    let url = req.url
    url = url.trim()
    let isFile = []
    
    url = url.replace(/%20/, ' ');

    let _urlArr = url.split('/')
    let last = _urlArr[_urlArr.length - 1]
    if (last === '') {
        _urlArr.pop()
        _urlArr.pop()
    }
    else {
        _urlArr.pop()
    }
    backUrl = _urlArr.join('/')
    
    const check = fs.existsSync(path.join(__dirname, '..', url))

    if (check) {
        let array_dir_contents = fs.readdirSync(path.join(__dirname, '..', url))

        if (!array_dir_contents[0]) {
            res.render('index', { array_dir_contents: array_dir_contents, isFile: isFile, url: url, backUrl: backUrl })
        } else {
            array_dir_contents.forEach((content) => {
                let boolean = fs.lstatSync(path.join(__dirname, '..', url, content)).isFile()
                isFile.push(boolean)
            })
            res.render('index', { array_dir_contents: array_dir_contents, isFile: isFile, url: url, backUrl: backUrl })
        }
    }
    else {
        res.send('<h1>no such directory found</h1>')
    }

})

module.exports = router;