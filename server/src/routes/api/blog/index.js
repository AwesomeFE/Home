import express from 'express'
import * as handler from './handler'

const router = express.Router()

router.get('/', handler.searchBlog)
router.post('/', handler.createBlog)
router.get('/:blogId', handler.getBlogDetail)
router.put('/:blogId', handler.updateBlog)
router.delete('/:blogId', handler.deleteBlog)

module.exports = router