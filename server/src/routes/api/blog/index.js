import multer from 'multer'
import express from 'express'
import * as handler from './handler'

const router = express.Router()
const upload = multer({dest: 'uploads/blog/'})

router.get('/', handler.searchBlog)
router.post('/', upload.array('files', 12), handler.createBlog)
router.get('/:blogId', handler.getBlogDetail)
router.put('/:blogId', handler.updateBlog)
router.delete('/:blogId', handler.deleteBlog)

module.exports = router
