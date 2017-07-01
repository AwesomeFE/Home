import express from 'express'
import validator from './validator'
import * as handler from './handler'

const router = express.Router()

router.get('/', handler.searchBlog)
router.post('/', handler.createBlog)
router.get('/:blogId', handler.getBlogDetail)
router.update('/:blogId', handler.updateBlog)
router.delete('/:blogId', handler.deleteBlog)

module.exports = router