const multer = require('multer')
const { resolve } = require('path')
const crypto = require('crypto')
const path = require('path')

module.exports = {
    dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
           crypto.randomBytes(16, (err, hash) => {
            if(err) cb(err)

            const filename = `${hash.toString('hex')}-${file.originalname}`

            cb(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
        fileFilter: (req, file, cb) => {
            const allowedMines = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ]

            if(allowedMines.includes(file.minetype)){
                cb(null, true)
            }else{
                cb(new Error('Formato inválido'))
            }
        }
    }
}